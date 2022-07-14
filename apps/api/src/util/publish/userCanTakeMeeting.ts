import { Duration } from '../../types/Duration';
import { MeetingBlock } from '../../types/MeetingBlock';

// Determines if a user can take a meeting
export const userCanTakeMeeting = (
  userBlocks: MeetingBlock[],
  duration: Duration
) => {
  const canTakeMeeting = userBlocks.reduce((prev, currBlock) => {
    const [, { start: currStart, end: currEnd }] = currBlock;

    if (duration.end.isSame(currStart) || duration.end.isBefore(currStart)) {
      return prev;
    }

    if (duration.start.isSame(currEnd) || duration.start.isAfter(currEnd)) {
      return prev;
    }

    return false;
  }, true);

  return canTakeMeeting;
};
