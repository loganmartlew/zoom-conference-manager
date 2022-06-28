import dayjs, { Dayjs } from 'dayjs';
import Event from '../entities/Event';
import Meeting from '../entities/Meeting';
import { axios } from '../loaders/axios';

const dateFormat = 'YYYY-MM-DD';
type Duration = [Dayjs, Dayjs];

export default class ZoomService {
  static async publishEvent(event: Event) {
    // const meetingsByDay: Map<string, Meeting[]> = new Map();

    // event.meetings.forEach((meeting) => {
    //   const date = dayjs(meeting.startDateTime);
    //   const dateString = date.format(dateFormat);

    //   if (meetingsByDay.has(dateString)) {
    //     let dayMeetings = meetingsByDay.get(dateString);

    //     if (!dayMeetings) {
    //       dayMeetings = [];
    //     }

    //     meetingsByDay.set(dateString, [...dayMeetings, meeting]);
    //   } else {
    //     meetingsByDay.set(dateString, [meeting]);
    //   }
    // });

    const users: string[] = ['logan', 'rhys', 'aman', 'amy', 'jack'];
    const userMeetingBlocks: Map<string, [Meeting, Duration][]> = new Map();
    users.forEach((user) => userMeetingBlocks.set(user, []));
    userMeetingBlocks.set('overflow', []);

    const meetingBlockTimes: [Meeting, Duration][] = event.meetings.map(
      (meeting) => {
        const start = dayjs(meeting.startDateTime).subtract(30, 'minutes');
        const end = dayjs(meeting.startDateTime)
          .add(meeting.duration, 'minutes')
          .add(30, 'minutes');

        const duration: Duration = [start, end];

        return [meeting, duration];
      }
    );

    meetingBlockTimes.forEach((block) => {
      const [, [start, end]] = block;

      let userIdx = 0;

      while (userIdx < users.length) {
        const user = users[userIdx];
        const userBlocks = userMeetingBlocks.get(user);

        if (!userBlocks) throw new Error('User blocks not in map');

        const userCanTakeMeeting = userBlocks.reduce((prev, currBlock) => {
          const [, [currStart, currEnd]] = currBlock;

          if (end.isSame(currStart) || end.isBefore(currStart)) {
            return prev;
          }

          if (start.isSame(currEnd) || start.isAfter(currEnd)) {
            return prev;
          }

          return false;
        }, true);

        if (userCanTakeMeeting) {
          userBlocks.push(block);
          userMeetingBlocks.set(user, userBlocks);
          return;
        }

        userIdx += 1;
      }

      userMeetingBlocks.get('overflow')?.push(block);
    });

    const objUserMeetingBlocks = Object.fromEntries(userMeetingBlocks);

    const userMeetings: { user: string; meeting: Meeting }[] = [];

    Object.keys(objUserMeetingBlocks).forEach((user) => {
      const meetings = objUserMeetingBlocks[user].map(([meeting]) => meeting);
      meetings.forEach((meeting) => {
        userMeetings.push({ user, meeting });
      });
    });
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

    return {};
  }
}
