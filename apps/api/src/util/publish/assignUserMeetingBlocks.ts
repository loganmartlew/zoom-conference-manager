import Meeting from '../../entities/Meeting';
import { getMeetingBlocks } from './getMeetingBlocks';
import { setupUserMeetingBlocks } from './setupUserMeetingBlocks';
import { userCanTakeMeeting } from './userCanTakeMeeting';

// Assign meetings to users
export const assignUserMeetingBlocks = (
  users: string[],
  meetings: Meeting[]
) => {
  const userMeetingBlocks = setupUserMeetingBlocks(users);

  const meetingBlocks = getMeetingBlocks(meetings);

  meetingBlocks.forEach((block) => {
    const [, duration] = block;

    let userIdx = 0;

    while (userIdx < users.length) {
      const user = users[userIdx];
      const userBlocks = userMeetingBlocks.get(user);

      if (!userBlocks) throw new Error('User blocks not in map');

      const canTakeMeeting = userCanTakeMeeting(userBlocks, duration);

      if (canTakeMeeting) {
        userBlocks.push(block);
        userMeetingBlocks.set(user, userBlocks);
        return;
      }

      userIdx += 1;
    }

    userMeetingBlocks.get('overflow')?.push(block);
  });

  return userMeetingBlocks;
};
