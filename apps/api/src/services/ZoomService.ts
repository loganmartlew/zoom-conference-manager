import Event from '../entities/Event';
import Meeting from '../entities/Meeting';
import { axios } from '../loaders/axios';
import { Logger } from '../loaders/logger';
import { assignUserMeetingBlocks } from '../util/publish/assignUserMeetingBlocks';
import { formatUserMeetings } from '../util/publish/formatUserMeetings';

export default class ZoomService {
  static async assignMeetings(meetings: Meeting[]) {
    const users: string[] = ['logan', 'rhys', 'aman', 'amy', 'jack'];

    const userMeetingBlocks = assignUserMeetingBlocks(users, meetings);

    const userMeetings = formatUserMeetings(userMeetingBlocks);

    return userMeetings;
  }

  static async publishEvent(event: Event) {
    const assignedMeetings: { user: string; meeting: Meeting }[] =
      await ZoomService.assignMeetings(event.meetings);

    Logger.info(`Assigned meetings`);
    Logger.info(JSON.stringify(assignedMeetings, null, 2));
  }

  static async scheduleMeeting(meeting: Meeting, userEmail: string) {
    const meetingData = {
      topic: meeting.name,
      schedule_for: userEmail,
      start_time: meeting.startDateTime.toISOString(),
      duration: meeting.duration,
      type: 2,
    };

    const res = await axios.post(`/users/${userEmail}/meetings`, meetingData);

    return res;
  }
}
