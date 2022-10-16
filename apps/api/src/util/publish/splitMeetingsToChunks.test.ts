import { FlatMeeting } from './flattenMeetings';
import { splitMeetingsToChunks } from './splitMeetingsToChunks';

describe('splitMeetingsToChunks', () => {
  // 12 meetings
  const meetings = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ] as FlatMeeting[];

  test('should split meetings evenly to chunks', () => {
    const result = splitMeetingsToChunks(meetings, 3);

    expect(result).toHaveLength(4);
    expect(result[0]).toHaveLength(3);
  });

  test('should split meetings unevenly to chunks', () => {
    const result = splitMeetingsToChunks(meetings, 5);

    expect(result).toHaveLength(3);
    expect(result[0]).toHaveLength(5);
  });

  test('should handle empty array', () => {
    const result = splitMeetingsToChunks([]);

    expect(result).toHaveLength(0);
  });
});
