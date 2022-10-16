/* eslint-disable import/no-cycle */
import { ApiError } from '@zoom-conference-manager/errors';
import dayjs from 'dayjs';
import Event from '../entities/Event';
import Meeting from '../entities/Meeting';
import { axios } from '../loaders/axios';
import { Logger } from '../loaders/logger';
import { RecordingFile, RecordingResponse } from '../types/RecordingResponse';
import { assignMeetings } from '../util/publish/assignMeetings';
import { flattenMeetings } from '../util/publish/flattenMeetings';
import MeetingService from './MeetingService';
import ZoomUserService from './ZoomUserService';

function handleZoomError(error: unknown, defaultMessage: string | null) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore error
  if (error.response?.data) {
    const zoomResponse: { code: number; message: string } =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore error
      error.response.data;

    switch (zoomResponse.code) {
      case 400: {
        throw new ApiError(error, 2004, null);
      }
      case 401: {
        throw new ApiError(error, 2002, null);
      }
      case 403: {
        throw new ApiError(error, 2003, null);
      }
      case 404: {
        throw new ApiError(error, 2005, null);
      }
      case 429: {
        throw new ApiError(error, 2001, null);
      }
      default: {
        throw new ApiError(error, 2000, defaultMessage);
      }
    }
  }
}

export default class ZoomService {
  static async publishEvent(event: Event) {
    const users = await ZoomUserService.getAll();

    const [userMeetings, unassignedMeetings] = assignMeetings(
      users,
      event.meetings
    );

    if (unassignedMeetings.length > 0) {
      Logger.error(`Unable to assign ${unassignedMeetings.length} meetings`);
      throw new ApiError(
        null,
        4005,
        'Failed to assign all meetings. More users required.'
      );
    }

    Logger.info(`Assigned meetings`);
    Logger.info(JSON.stringify(userMeetings, null, 2));

    const flatMeetings = flattenMeetings(userMeetings);

    try {
      await Promise.all(
        flatMeetings.map((flatMeeting) => {
          return ZoomService.scheduleMeeting(
            flatMeeting.meeting,
            flatMeeting.email
          );
        })
      );
    } catch (error) {
      Logger.error(`Unable to publish event`);
      Logger.error(error);
      throw new ApiError(error, 2000, 'Error scheduling meetings');
    }
  }

  static async unpublishEvent(event: Event) {
    await Promise.all(
      event.meetings.map((meeting) => ZoomService.deleteMeeting(meeting))
    );
  }

  static async getEventRecordings(event: Event) {
    const recordings = await Promise.all(
      event.meetings.map((meeting) => ZoomService.getRecording(meeting))
    );

    return recordings;
  }

  static async scheduleMeeting(meeting: Meeting, userEmail: string) {
    const SCHEDULED_MEETING = 2;

    const meetingData = {
      topic: meeting.name,
      schedule_for: userEmail,
      start_time: meeting.startDateTime.toISOString(),
      duration: Math.abs(
        dayjs(meeting.startDateTime).diff(dayjs(meeting.endDateTime), 'minute')
      ),
      type: SCHEDULED_MEETING,
    };

    try {
      const res = await axios.post<{ id: number }>(
        `/users/${userEmail}/meetings`,
        meetingData
      );

      const zoomId = res.data.id;

      await MeetingService.setZoomId(meeting.id, `${zoomId}`);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      handleZoomError(error, 'Error scheduling meeting with Zoom');
    }
  }

  static async deleteMeeting(meeting: Meeting) {
    if (!meeting.zoomId) {
      Logger.error(`Unable to delete meeting ${meeting.name} from Zoom`);
      return;
    }

    try {
      await axios.delete(`/meetings/${meeting.zoomId}`);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      handleZoomError(error, 'Error deleting meeting from Zoom');
    }
  }

  static async getRecording(meeting: Meeting): Promise<RecordingFile> {
    if (!meeting.zoomId) {
      throw new Error('Meeting does not have a zoomId');
    }

    try {
      const res = await axios.get<RecordingResponse>(
        `/meetings/${meeting.zoomId}/recordings`
      );
      const recordings = res.data.recording_files.sort(
        (a, b) => a.file_size - b.file_size
      );

      if (recordings.length === 0) {
        throw new ApiError(null, 2005, 'No recordings found for meeting');
      }

      return recordings[0];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      handleZoomError(error, 'Error getting recording from Zoom');
    }

    return {} as RecordingFile;
  }
}
