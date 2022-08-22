import dayjs from 'dayjs';
import Meeting from '../../entities/Meeting';
import { userCanTakeMeeting } from './userCanTakeMeeting';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

describe('userCanTakeMeeting', () => {
  const userMeetings: Meeting[] = [
    {
      startDateTime: dayjs('2022-08-01 14:00:00', dateFormat).toDate(),
      endDateTime: dayjs('2022-08-01 15:00:00', dateFormat).toDate(),
    } as Meeting,
  ];

  test('should return true if user can take meeting', () => {
    const meetingBefore: Meeting = {
      startDateTime: dayjs('2022-08-01 12:00:00', dateFormat).toDate(),
      endDateTime: dayjs('2022-08-01 13:00:00', dateFormat).toDate(),
    } as Meeting;

    const meetingAfter: Meeting = {
      startDateTime: dayjs('2022-08-01 16:00:00', dateFormat).toDate(),
      endDateTime: dayjs('2022-08-01 17:00:00', dateFormat).toDate(),
    } as Meeting;

    expect(userCanTakeMeeting(userMeetings, meetingBefore)).toBe(true);
    expect(userCanTakeMeeting(userMeetings, meetingAfter)).toBe(true);
  });

  test('should return false if user cannot take meeting', () => {
    const doubledMeetings = [...userMeetings, ...userMeetings];

    const meeting: Meeting = {
      startDateTime: dayjs('2022-08-01 15:00:00', dateFormat).toDate(),
      endDateTime: dayjs('2022-08-01 16:00:00', dateFormat).toDate(),
    } as Meeting;

    expect(userCanTakeMeeting(doubledMeetings, meeting, 1)).toBe(false);
  });

  test('should allow specified number of concurrent meetings', () => {
    const meeting: Meeting = {
      startDateTime: dayjs('2022-08-01 15:00:00', dateFormat).toDate(),
      endDateTime: dayjs('2022-08-01 16:00:00', dateFormat).toDate(),
    } as Meeting;

    expect(userCanTakeMeeting(userMeetings, meeting, 1)).toBe(false);

    const tripleMeetings = [...userMeetings, ...userMeetings, ...userMeetings];

    expect(userCanTakeMeeting(tripleMeetings, meeting, 3)).toBe(false);
  });
});
