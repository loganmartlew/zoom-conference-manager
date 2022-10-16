import XLSX, { WorkBook, WorkSheet } from 'xlsx';
import { MeetingRecording } from '../types/MeetingRecording';

const sheetName = 'Recordings';

export default class WorkbookBuilder {
  private sheet: WorkSheet;

  constructor(
    private eventName: string,
    private meetingRecordings: MeetingRecording[]
  ) {}

  getWorkbook(): WorkBook {
    const wb = XLSX.utils.book_new();
    wb.Props = {
      Title: this.eventName,
    };

    wb.SheetNames.push(sheetName);

    this.generateSheet();

    wb.Sheets[sheetName] = this.sheet;

    return wb;
  }

  generateSheet(): void {
    const titles = [
      'Meeting ID',
      'Meeting Name',
      'Recording Size',
      'Recording URL',
    ];
    const values = this.meetingRecordings.map((recording) =>
      Object.values(recording)
    );

    const data = [titles, ...values];

    this.sheet = XLSX.utils.aoa_to_sheet(data);
  }
}
