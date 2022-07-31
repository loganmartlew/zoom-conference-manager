import XLSX from 'xlsx';
import fs from 'fs';
import { EventDTO } from '@zoom-conference-manager/api-interfaces';
import { EventStatus } from '@zoom-conference-manager/types';
import Event from '../entities/Event';
import extractExcelData from '../util/extractExcel';

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

    return event;
  }

  static async create(eventData: EventDTO): Promise<Event> {
    const eventStub = await Event.create();

    if (!eventStub) throw new Error('Unable to create event');

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
    const result = await Event.delete(id);
    if (!result.affected) return false;
    return result.affected > 0;
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
    try {
      const event = await this.getOne(id);

      if (event.status === EventStatus.PUBLISHED) {
        throw new Error('Event is already published');
      }

      event.status = EventStatus.PUBLISHED;
      const updatedEvent = await event.save();

      return updatedEvent;
    } catch (error) {
      throw new Error('Unable to publish event');
    }
  }

  static async unpublish(id: string): Promise<Event> {
    try {
      const event = await this.getOne(id);

      if (event.status === EventStatus.DRAFT) {
        throw new Error('Event is not published');
      }

      event.status = EventStatus.DRAFT;
      const updatedEvent = await event.save();

      return updatedEvent;
    } catch (error) {
      throw new Error('Unable to unpublish event');
    }
  }
  /*
  [file] parameter :

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

  static async uploadFile(file: any): Promise<void> {
    try {
      // Get Root directory, then combine it into excel location
      const rootDir = __dirname.split('dist/apps/api')[0];
      const excelFileLocation = rootDir + file.path;

      const workBook = XLSX.readFile(excelFileLocation);

      // Create List of meeting from excel file
      const meetingList = extractExcelData(workBook);

      console.log('Meeting List: ', meetingList);

      // Remove the excel file from system
      fs.unlinkSync(excelFileLocation);

      // TODO : Schedule Meeting from the [meetingList]
    } catch (error) {
      throw new Error('Unable to read the Excel File');
    }
  }
}
