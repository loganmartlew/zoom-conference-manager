import Meeting from '../../entities/Meeting';
import { UserMeeting } from './assignMeetings';

interface FlatMeeting {
  email: string;
  meeting: Meeting;
}

export const flattenMeetings = (userMeetings: UserMeeting[]): FlatMeeting[] => {
  const meetings: FlatMeeting[] = [];

  userMeetings.forEach((userMeeting) => {
    userMeeting.meetings.forEach((meeting) => {
      meetings.push({
        email: userMeeting.email,
        meeting,
      });
    });
  });

  return meetings;
};
