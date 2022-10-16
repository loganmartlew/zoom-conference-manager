import Meeting from '../../entities/Meeting';
import ZoomUser from '../../entities/ZoomUser';
import { userCanTakeMeeting } from './userCanTakeMeeting';

export interface UserMeeting extends ZoomUser {
  meetings: Meeting[];
}

export const assignMeetings = (
  users: ZoomUser[],
  meetings: Meeting[]
): [UserMeeting[], Meeting[]] => {
  const userMeetings: UserMeeting[] = users.map(
    (user) =>
      ({
        ...user,
        meetings: [],
      } as unknown as UserMeeting)
  );

  const assignedMeetings: Meeting[] = [];

  meetings.forEach((meeting) => {
    let assigned = false;

    userMeetings.forEach((userMeeting) => {
      if (assigned) return;

      const canTakeMeeting = userCanTakeMeeting(userMeeting.meetings, meeting);
      if (canTakeMeeting) {
        userMeeting.meetings.push(meeting);
        assignedMeetings.push(meeting);
        assigned = true;
      }
    });
  });

  const unassignedMeetings = meetings.filter((meeting) => {
    const isAssigned = assignedMeetings.find(
      (assignedMeeting) => assignedMeeting.id === meeting.id
    );
    return !isAssigned;
  });

  return [userMeetings, unassignedMeetings];
};
