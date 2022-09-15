/* eslint-disable import/no-cycle */
import dayjs from 'dayjs';
import Event from '../entities/Event';
import Meeting from '../entities/Meeting';
import { axios } from '../loaders/axios';
import { Logger } from '../loaders/logger';
import { assignMeetings } from '../util/publish/assignMeetings';
import { flattenMeetings } from '../util/publish/flattenMeetings';
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
      throw new Error('Failed to assign all meetings. More users required.');
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
    } catch (e) {
      Logger.error(`Unable to publish event`);
      Logger.error(e);
      throw new Error('Error scheduling meetings');
    }
  }

  static async unpublishEvent(event: Event) {
    await Promise.all(
      event.meetings.map((meeting) => ZoomService.deleteMeeting(meeting))
    );
  }

  static async scheduleMeeting(meeting: Meeting, userEmail: string) {
    const SCHEDULED_MEETING = 2;

    const meetingData = {
      topic: meeting.name,
      schedule_for: userEmail,
      start_time: meeting.startDateTime.toISOString(),
      duration: Math.abs(
        dayjs(meeting.startDateTime).diff(
          dayjs(meeting.endDateTime).add(30, 'minutes'),
          'minute'
        )
      ),
      type: SCHEDULED_MEETING,
    };

    const res = await axios.post<{ id: number }>(
      `/users/${userEmail}/meetings`,
      meetingData
    );

    const zoomId = res.data.id;

    await MeetingService.setZoomId(meeting.id, `${zoomId}`);
  }

  static async deleteMeeting(meeting: Meeting) {
    if (!meeting.zoomId) {
      Logger.error(`Unable to delete meeting ${meeting.name} from Zoom`);
      return;
    }

    try {
      await axios.delete(`/meetings/${meeting.zoomId}`);
    } catch (e) {
      Logger.error(`Unable to delete meeting ${meeting.name} from Zoom`);
    }
  }
}
