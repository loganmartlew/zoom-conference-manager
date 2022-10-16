import { FlatMeeting } from './flattenMeetings';

const defaultChunkSize = 20;

export const splitMeetingsToChunks = (
  meetings: FlatMeeting[],
  chunkSize = defaultChunkSize
): FlatMeeting[][] => {
  const result = meetings.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      // eslint-disable-next-line no-param-reassign
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, [] as FlatMeeting[][]);

  return result;
};
