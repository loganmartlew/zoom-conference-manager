/* eslint-disable import/no-cycle */
import XLSX from 'xlsx';
import fs from 'fs';
import { EventDTO } from '@zoom-conference-manager/api-interfaces';
import { EventStatus } from '@zoom-conference-manager/types';
import Event from '../entities/Event';
import ZoomService from './ZoomService';
import MeetingService from './MeetingService';
import { MeetingBuilder } from '../util/MeetingBuilder';

export default class EventService {
  static async getAll(): Promise<Event[]> {
    const events = await Event.find({ relations: ['meetings'] });
    return events;
  }

  static async getNames(): Promise<Event[]> {
    const eventNames = await Event.find({
      select: {
        id: true,
        name: true,
      },
    });

    return eventNames;
  }

  static async getOne(id: string): Promise<Event> {
    const event = await Event.findOne({
      where: { id },
      relations: ['meetings'],
    });
    if (!event) {
      throw new Error('Event not found');
    }

    event.meetings.sort((a, b) => {
      if (a.startDateTime < b.startDateTime) {
        return -1;
      }
      if (a.startDateTime > b.startDateTime) {
        return 1;
      }

      return 0;
    });

    return event;
  }

  static async create(eventData: EventDTO): Promise<Event> {
    const eventStub = await Event.create();

    if (!eventStub) throw new Error('Unable to create event');

    eventStub.ubid = eventData.ubid;
    eventStub.name = eventData.name;
    eventStub.description = eventData.description;
    eventStub.startDate = eventData.startDate;
    eventStub.endDate = eventData.endDate;

    try {
      const event = await eventStub.save();
      return event;
    } catch (error) {
      throw new Error('Unable to save event');
    }
  }

  static async delete(id: string): Promise<boolean> {
    const event = await this.getOne(id);

    await Promise.all(
      event.meetings.map((meeting) => {
        return MeetingService.delete(meeting.id);
      })
    );

    const result = await Event.delete(id);
    if (!result.affected) return false;
    return result.affected > 0;
  }

  static async clearMeetings(id: string): Promise<boolean> {
    const event = await this.getOne(id);

    await Promise.all(
      event.meetings.map((meeting) => {
        return MeetingService.delete(meeting.id);
      })
    );

    const updatedEvent = await this.getOne(id);

    return updatedEvent.meetings.length === 0;
  }

  static async update(id: string, eventData: EventDTO): Promise<Event> {
    try {
      const event = await this.getOne(id);

      event.name = eventData.name;
      event.description = eventData.description;
      event.startDate = eventData.startDate;
      event.endDate = eventData.endDate;

      const updatedEvent = await event.save();

      return updatedEvent;
    } catch (error) {
      throw new Error('Unable to update Event');
    }
  }

  static async publish(id: string): Promise<Event> {
    const event = await this.getOne(id);

    if (event.status === EventStatus.PUBLISHED) {
      throw new Error('Event is already published');
    }

    await ZoomService.publishEvent(event);

    event.status = EventStatus.PUBLISHED;
    const updatedEvent = await event.save();

    return updatedEvent;
  }

  static async unpublish(id: string): Promise<Event> {
    try {
      const event = await this.getOne(id);

      if (event.status === EventStatus.DRAFT) {
        throw new Error('Event is not published');
      }

      event.status = EventStatus.DRAFT;
      const updatedEvent = await event.save();

      await ZoomService.unpublishEvent(event);

      return updatedEvent;
    } catch (error) {
      throw new Error('Unable to unpublish event');
    }
  }
  /*
  [file] obj structure :

  File:  {
    fieldname: 'excelFile',
    originalname: 'agenda_export_auotm_202203_2.xls',
    encoding: '7bit',
    mimetype: 'application/vnd.ms-excel',
    destination: 'uploads/',
    filename: 'b60b92b4e5dad1dedf95fb02a6f5cb31',
    path: 'uploads/b60b92b4e5dad1dedf95fb02a6f5cb31',
    size: 104448
  }
  */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async uploadFile(id: string, file: any): Promise<void> {
    const excelFileLocation = file.path;

    try {
      const workBook = XLSX.readFile(excelFileLocation);

      const agenda = workBook.Sheets.Agenda;
      const builder = new MeetingBuilder(id, agenda);

      const meetingList = builder.getMeetings();

      await Promise.all(
        await meetingList.map(async (meetingDto) => {
          // console.log(meetingDto);
          // eslint-disable-next-line @typescript-eslint/return-await
          return await MeetingService.create(meetingDto);
        })
      );

      // Remove the excel file from system
      fs.unlinkSync(excelFileLocation);
    } catch (error) {
      fs.unlinkSync(excelFileLocation);
      throw error;
    }
  }
}
