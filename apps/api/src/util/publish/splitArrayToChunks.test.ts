import { splitArrayToChunks } from './splitArrayToChunks';

describe('splitArrayToChunks', () => {
  // 12 entries
  const array = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  test('should split entries evenly to chunks', () => {
    const result = splitArrayToChunks(array, 3);

    expect(result).toHaveLength(4);
    expect(result[0]).toHaveLength(3);
  });

  test('should split entries unevenly to chunks', () => {
    const result = splitArrayToChunks(array, 5);

    expect(result).toHaveLength(3);
    expect(result[0]).toHaveLength(5);
  });

  test('should handle empty array', () => {
    const result = splitArrayToChunks([], 5);

    expect(result).toHaveLength(0);
  });
});
