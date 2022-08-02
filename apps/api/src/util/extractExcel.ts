/* eslint-disable no-plusplus */
import XLSX, { WorkBook } from 'xlsx';

/*
- Meeting info starts from Row 24
- Meeting info ends in Row of item '!ref'

- COLUMN ALPHABETH INFO :
    - A : Date
    - B : Start Time
    - C : End Time
    - D : Tracks
    - E : Session Title
    - F : Room / Location
    - G : Description
    - H : Speakers
    - I : Authors
    - J : Live streaming URL
    - K : Recorded Video URL
    - L : Session or Sub-Session (Sub)
*/

function createMeetingList(agenda: XLSX.WorkSheet, keys: string[]) {
  const meetingList = [];
  let meeting = [];

  let dateKey = '';
  let startTimeKey = '';
  let endTimeKey = '';
  let sessionTitleKey = '';

  for (let row = 0; row < keys.length; row++) {
    if (keys[row].at(0) === 'A') {
      dateKey = keys[row];
      meeting.push(agenda[dateKey].v);
    } else if (keys[row].at(0) === 'B') {
      startTimeKey = keys[row];
      meeting.push(agenda[startTimeKey].v);
    } else if (keys[row].at(0) === 'C') {
      endTimeKey = keys[row];
      meeting.push(agenda[endTimeKey].v);
    } else if (keys[row].at(0) === 'E') {
      sessionTitleKey = keys[row];
      meeting.push(agenda[sessionTitleKey].v);

      // TODO : add duration field to meeting

      meetingList.push(meeting);
      meeting = [];
    }
  }
  return meetingList;
}

function extractExcelData(workBook: WorkBook) {
  const agenda = workBook.Sheets.Agenda;

  if (!agenda) {
    throw Error('Excel not includes Agenda sheet');
  }

  // [keys] : [ A1, B1, C1 ... Jn Kn Ln ]
  const keys = Object.keys(agenda);

  if (keys.includes('START YOUR AGENDA BELOW')) {
    throw Error('Wrong excel format');
  }

  const startIndex = keys.indexOf('A25');
  const endIndex = keys.indexOf('!ref') - 1;

  // Slice [keys] to get only meeting informations
  const slicedKeys = keys.slice(startIndex, endIndex);

  const meetingList = createMeetingList(agenda, slicedKeys);

  return meetingList;
}

export default extractExcelData;
