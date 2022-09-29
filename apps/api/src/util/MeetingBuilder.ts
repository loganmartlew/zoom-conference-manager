/* eslint-disable no-continue */
import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { formats } from '@zoom-conference-manager/dates';
import dayjs from 'dayjs';
import { WorkSheet } from 'xlsx';

const firstDataRow = 2;

export class MeetingBuilder {
  private entries = 0;

  constructor(private eventId: string, private agenda: WorkSheet) {}

  getMeetings(): MeetingDTO[] {
    const meetings: MeetingDTO[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = firstDataRow; i <= this.getNumberOfEntries(); i++) {
      const [meetingDto, session] = this.buildDtoFromRow(i);

      if (!this.agenda[`L${i + 1}`]) {
        continue;
      }

      const nextSession = this.agenda[`L${i + 1}`].v;

      if (!meetingDto.eventId) {
        continue;
      }

      if (session === 'Sub') {
        meetings.push(meetingDto);
        continue;
      }

      if (!nextSession && session === 'Session') {
        meetings.push(meetingDto);
        continue;
      }

      if (session === 'Session' && nextSession === 'Session') {
        meetings.push(meetingDto);
        continue;
      }
    }

    return meetings;
  }

  private getNumberOfEntries(): number {
    if (this.entries !== 0) {
      return this.entries;
    }

    const keys = Object.keys(this.agenda);

    keys.forEach((key) => {
      const number = +key.replace(/\D/g, '');

      if (number > this.entries) {
        this.entries = number;
      }
    });

    return this.entries;
  }

  private buildDtoFromRow(row: number): [MeetingDTO, string] {
    const cells = [
      this.agenda[`E${row}`],
      this.agenda[`A${row}`],
      this.agenda[`B${row}`],
      this.agenda[`C${row}`],
      this.agenda[`L${row}`],
    ];

    if (cells.some((cell) => !cell)) {
      return [{} as MeetingDTO, ''];
    }

    cells.forEach((cell) => {
      if (!cell) {
        console.log('UNDEFINED CELL');
      }
    });

    const cellValues = cells.map((cell) => cell.v);

    const [title, date, startTime, endTime, session] = cellValues;

    const expandedDate = MeetingBuilder.expandDate(date);

    const startDate = dayjs(
      `${expandedDate} ${startTime}`,
      'MM/DD/YYYY hh:mm A'
    );

    const startDateTime = startDate.format(formats.dateTime);

    const endDate = dayjs(`${expandedDate} ${endTime}`, 'MM/DD/YYYY hh:mm A');

    const endDateTime = endDate.format(formats.dateTime);

    if (endDate.isBefore(startDate)) {
      endDate.add(1, 'day');

      if (endDate.isBefore(startDate)) {
        throw new Error(`End date is before start date`);
      }
    }

    const meetingDto: MeetingDTO = {
      eventId: this.eventId,
      name: title,
      startDateTime,
      endDateTime,
    };

    return [meetingDto, session];
  }

  private static expandDate(date: string): string {
    const [month, day, year] = date.split('/');

    const eMonth = month.padStart(2, '0');
    const eDay = day.padStart(2, '0');

    return `${eMonth}/${eDay}/${year}`;
  }
}
