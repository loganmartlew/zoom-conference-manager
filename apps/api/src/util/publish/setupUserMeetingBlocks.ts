import { MeetingBlock } from '../../types/MeetingBlock';

// This function sets up a Map data structure to hold meetings and durations for each user.
export const setupUserMeetingBlocks = (users: string[]) => {
  const userMeetingBlocks: Map<string, MeetingBlock[]> = new Map();

  users.forEach((user) => userMeetingBlocks.set(user, []));
  userMeetingBlocks.set('overflow', []);

  return userMeetingBlocks;
};
