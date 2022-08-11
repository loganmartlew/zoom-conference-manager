/* eslint-disable no-plusplus */
import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import XLSX, { WorkBook } from 'xlsx';

interface RawExtractData {
  date: string; // Formate : MM/DD/YYYY (US style)
  starttime: string;
  endtime: string;
  title: string;
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

function formatHourAMPM(time: string): string {
  const [hhmm, meridiem] = time.split(' ');
  const [hh, mm] = hhmm.split(':');
  const fmthh = (
    parseInt(hh, 10) +
    ((meridiem === 'PM' && hh !== '12') || (meridiem === 'AM' && hh === '12')
      ? 12
      : 0)
  ).toString();
  return `${fmthh}:${mm}`;
}

function convertHHMMtoMinutes(time: string): number {
  const [hh, mm] = time.split(':');
  return parseInt(hh, 10) * 60 + parseInt(mm, 10);
}

function calculateDuration(start: string, end: string): number {
  return convertHHMMtoMinutes(end) - convertHHMMtoMinutes(start);
}

function createOneMeetingObj(
  eventID: string,
  datas: RawExtractData
): MeetingDTO {
  // Construct Meeting Obj [startDateTime] field
  const mmddyyyyFormat = datas.date.split('/');
  const fmtDate = `${mmddyyyyFormat[2]}/${mmddyyyyFormat[0]}/${mmddyyyyFormat[1]}`;
  const fmtStarthhmm = formatHourAMPM(datas.starttime);
  const startDateTime = `${fmtDate} ${fmtStarthhmm}:00`;

  // Construct Meeting Obj [duration] field
  const duration = calculateDuration(
    fmtStarthhmm,
    formatHourAMPM(datas.endtime)
  );

  // TODO : [ubid] field
  return {
    ubid: `${Math.random()}`,
    name: datas.title,
    startDateTime,
    duration,
    eventId: eventID,
  };
}

function createMeetingObjList(
  eventID: string,
  agenda: XLSX.WorkSheet,
  keys: string[]
): MeetingDTO[] {
  const meetingList = [];

  let isOnlineMeeting = false;
  const rawData: RawExtractData = {
    date: '',
    starttime: '',
    endtime: '',
    title: '',
  };

  for (let column = 0; column < keys.length; column++) {
    if (
      keys[column].at(0) === 'A' &&
      keys[column + 5].at(0) === 'F' &&
      agenda[keys[column + 5]].v.trim().includes('Online')
    ) {
      /// Only starting building Meeting obj, if the Row is specified online meeting
      isOnlineMeeting = true;
      rawData.date = agenda[keys[column]].v;
    }
    if (isOnlineMeeting) {
      if (keys[column].at(0) === 'B') {
        rawData.starttime = agenda[keys[column]].v;
      } else if (keys[column].at(0) === 'C') {
        rawData.endtime = agenda[keys[column]].v;
      } else if (keys[column].at(0) === 'E') {
        rawData.title = agenda[keys[column]].v;
        isOnlineMeeting = false;

        meetingList.push(createOneMeetingObj(eventID, rawData));
      }
    }
  }
  return meetingList;
}

function extractExcelData(eventID: string, workBook: WorkBook) {
  const agenda = workBook.Sheets.Agenda;

  if (!agenda) {
    throw Error('Excel not includes Agenda sheet');
  }

  // [keys] : [ A1, B1, C1 ... Jn Kn Ln ]
  const keys = Object.keys(agenda);

  // if (!Object.values(agenda).includes('START YOUR AGENDA BELOW')) {
  //   throw Error('Wrong excel format');
  // }

  const startIndex = keys.indexOf('A25');
  const endIndex = keys.indexOf('!ref') - 1;

  // Slice [keys] to get only meeting informations
  const slicedKeys = keys.slice(startIndex, endIndex);

  const meetingList = createMeetingObjList(eventID, agenda, slicedKeys);

  return meetingList;
}

export default extractExcelData;
