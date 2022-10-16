/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-cycle */
import { ApiError } from '@zoom-conference-manager/errors';
import dayjs from 'dayjs';
import Event from '../entities/Event';
import Meeting from '../entities/Meeting';
import { axios } from '../loaders/axios';
import { Logger } from '../loaders/logger';
import delay from '../util/delay';
import { assignMeetings } from '../util/publish/assignMeetings';
import { flattenMeetings } from '../util/publish/flattenMeetings';
import { splitArrayToChunks } from '../util/publish/splitArrayToChunks';
import MeetingService from './MeetingService';
import ZoomUserService from './ZoomUserService';

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
    const meetingChunks = splitArrayToChunks(flatMeetings, 20);

    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const chunk of meetingChunks) {
        await Promise.all(
          chunk.map((flatMeeting) => {
            return ZoomService.scheduleMeeting(
              flatMeeting.meeting,
              flatMeeting.email
            );
          })
        );

        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      Logger.error(`Unable to publish event`);
      Logger.error(error);
      throw new ApiError(error, 2000, 'Error scheduling meetings');
    }
  }

  static async unpublishEvent(event: Event) {
    const meetingChunks = splitArrayToChunks(event.meetings, 20);

    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const chunk of meetingChunks) {
        await Promise.all(
          chunk.map((meeting) => {
            return ZoomService.deleteMeeting(meeting);
          })
        );

        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (e) {
      Logger.error(`Unable to publish event`);
      Logger.error(e);
      throw new Error('Error scheduling meetings');
    }
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
      // const res = await axios.post<{ id: number }>(
      //   `/users/${userEmail}/meetings`,
      //   meetingData
      // );
      await delay(100);

      // const zoomId = res.data.id;
      const zoomId = Math.floor(Math.random() * 1000000000);

      await MeetingService.setZoomId(meeting.id, `${zoomId}`);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

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
            throw new ApiError(error, 2000, null);
          }
        }
      }
    }
  }

  static async deleteMeeting(meeting: Meeting) {
    if (!meeting.zoomId) {
      Logger.error(`Unable to delete meeting ${meeting.name} from Zoom`);
      return;
    }

    try {
      // await axios.delete(`/meetings/${meeting.zoomId}`);
      await delay(500);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

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
            throw new ApiError(error, 2000, null);
          }
        }
      }
    }
  }
}
