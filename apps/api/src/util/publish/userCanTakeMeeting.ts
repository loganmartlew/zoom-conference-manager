import dayjs from 'dayjs';
import Meeting from '../../entities/Meeting';
import { MeetingDuration } from '../../types/MeetingDuration';

const getDurationFromMeeting = (meeting: Meeting): MeetingDuration => {
  return {
    meeting,
    duration: {
      start: dayjs(meeting.startDateTime),
      end: dayjs(meeting.endDateTime).add(30, 'minutes'),
    },
  };
};

const isOverlap = (
  meetingA: MeetingDuration,
  meetingB: MeetingDuration
): boolean => {
  const aStart = meetingA.duration.start;
  const aEnd = meetingA.duration.end;
  const bStart = meetingB.duration.start;
  const bEnd = meetingB.duration.end;

  if (aEnd.isSame(bStart) || aEnd.isBefore(bStart)) {
    return false;
  }

  if (aStart.isSame(bEnd) || aStart.isAfter(bEnd)) {
    return false;
  }

  return true;
};

// Determines if a user can take a meeting
export const userCanTakeMeeting = (
  meetings: Meeting[],
  meeting: Meeting,
  overlapLimit = 2
) => {
  const meetingDuration = getDurationFromMeeting(meeting);
  const meetingDurations: MeetingDuration[] = meetings.map((m) =>
    getDurationFromMeeting(m)
  );

  const overlappingMeetings = meetingDurations.reduce((count, md) => {
    if (isOverlap(md, meetingDuration)) {
      return count + 1;
    }

    return count;
  }, 0);

  return overlappingMeetings < overlapLimit;
};
