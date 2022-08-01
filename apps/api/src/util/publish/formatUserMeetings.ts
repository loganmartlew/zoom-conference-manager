import Meeting from '../../entities/Meeting';
import { MeetingBlock } from '../../types/MeetingBlock';

// Flatten the meeting blocks into a single array of users and meetings
export const formatUserMeetings = (
  userMeetingBlocks: Map<string, MeetingBlock[]>
) => {
  const objUserMeetingBlocks = Object.fromEntries(userMeetingBlocks);

  const userMeetings: { user: string; meeting: Meeting }[] = [];

  Object.keys(objUserMeetingBlocks).forEach((user) => {
    const singleMeetings = objUserMeetingBlocks[user].map(
      ([meeting]) => meeting
    );
    singleMeetings.forEach((meeting) => {
      userMeetings.push({ user, meeting });
    });
  });

  return userMeetings;
};
