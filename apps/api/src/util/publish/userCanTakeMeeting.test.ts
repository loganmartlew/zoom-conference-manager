import dayjs = require('dayjs');
import Meeting from '../../entities/Meeting';
import { Duration } from '../../types/Duration';
import { MeetingBlock } from '../../types/MeetingBlock';
import { userCanTakeMeeting } from './userCanTakeMeeting';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

describe('userCanTakeMeeting', () => {
  const userBlocks: MeetingBlock[] = [
    [
      {} as Meeting,
      {
        start: dayjs('2022-08-01 14:00:00', dateFormat),
        end: dayjs('2022-08-01 15:30:00', dateFormat),
      },
    ],
  ];

  test('should return true if user can take meeting', () => {
    const durationBefore: Duration = {
      start: dayjs('2022-08-01 12:00:00', dateFormat),
      end: dayjs('2022-08-01 13:30:00', dateFormat),
    };

    const durationAfter: Duration = {
      start: dayjs('2022-08-01 16:00:00', dateFormat),
      end: dayjs('2022-08-01 17:30:00', dateFormat),
    };

    expect(userCanTakeMeeting(userBlocks, durationBefore)).toBe(true);
    expect(userCanTakeMeeting(userBlocks, durationAfter)).toBe(true);
  });

  test('should return false if user cannot take meeting', () => {
    const duration: Duration = {
      start: dayjs('2022-08-01 15:00:00', dateFormat),
      end: dayjs('2022-08-01 17:30:00', dateFormat),
    };

    expect(userCanTakeMeeting(userBlocks, duration)).toBe(false);
  });

  test('should allow certain number of concurrent meetings', () => {});
});
