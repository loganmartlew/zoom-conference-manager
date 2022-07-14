import dayjs from 'dayjs';
import Meeting from '../../entities/Meeting';
import { Duration } from '../../types/Duration';
import { MeetingBlock } from '../../types/MeetingBlock';

// This function generates the duration of each meeting and returns the meeting block
export const getMeetingBlocks = (meetings: Meeting[]) => {
  const meetingBlocks: MeetingBlock[] = meetings.map((meeting) => {
    const start = dayjs(meeting.startDateTime).subtract(30, 'minutes');
    const end = dayjs(meeting.startDateTime)
      .add(meeting.duration, 'minutes')
      .add(30, 'minutes');

    const duration: Duration = { start, end };

    return [meeting, duration];
  });

  return meetingBlocks;
};
