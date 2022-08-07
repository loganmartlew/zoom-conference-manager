/* eslint-disable no-plusplus */
import XLSX, { WorkBook } from 'xlsx';
import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';

interface RawExtractData {
  date: string; // Formate : MM/DD/YYYY (US style)
  starttime: string;
  endtime: string;
  title: string;
  isOnline: boolean;
}

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

function createMeetingObjList(agenda: XLSX.WorkSheet, keys: string[]) {
  const meetingList = [];

  let isCreateMeeting = false;
  let rawData: RawExtractData = {
    date: '',
    starttime: '',
    endtime: '',
    title: '',
    isOnline: false,
  };

  for (let column = 0; column < keys.length; column++) {
    if (
      keys[column].at(0) === 'A' &&
      keys[column + 5].at(0) === 'F' &&
      agenda[keys[column + 5]].v.includes('Online')
    ) {
      /// Only starting building Meeting obj, if the Row is online meeting
      isCreateMeeting = true;
      rawData.date = agenda[keys[column]].v;
    }
    if (isCreateMeeting) {
      if (keys[column].at(0) === 'B') {
        rawData.starttime = agenda[keys[column]].v;
      } else if (keys[column].at(0) === 'C') {
        rawData.endtime = agenda[keys[column]].v;
      } else if (keys[column].at(0) === 'E') {
        rawData.title = agenda[keys[column]].v;
        isCreateMeeting = false;

        // TODO : Build Meeting Obj from [rawData]

        meetingList.push(rawData);

        rawData = {
          date: '',
          starttime: '',
          endtime: '',
          title: '',
          isOnline: false,
        };
      }
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

  const meetingList = createMeetingObjList(agenda, slicedKeys);

  return meetingList;
}

export default extractExcelData;
