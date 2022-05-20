import { EventDTO } from '@zoom-conference-manager/api-interfaces';
import Event from '../entities/Event';
import MeetingService from './MeetingService';

export default class EventService {
  static async getAll() {
    const events = await Event.find();
    return events;
  }

  static async getOne(id: string) {
    const event = await Event.findOneBy({ id });
    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  }

  static async create(eventData: EventDTO) {
    const eventStub = await Event.create({ ...eventData });

    if (!eventStub) throw new Error('Unable to create event');

    try {
      const event = await eventStub.save();
      return event;
    } catch (error) {
      throw new Error('Unable to save event');
    }
  }

  static async delete(id: string) {
    const result = await Event.delete(id);
    if (!result.affected) return false;
    return result.affected > 0;
  }

  static async update(id: string, eventData: EventDTO) {
    try {

      /// Return UpdateResult obj
      // const updatedEvent = await Event.update(id, eventData);

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

  static async addMeeting(eventID: string, meetingID: string) {
    const event = await this.getOne(eventID);
    const meeting = await MeetingService.getOne(meetingID);

    /// If current event.meeting is null (empty), create new Array
    if (!event.meetings) {
      event.meetings = [ meeting ];
    }
    /// Else, push meeting to current existed Array
    else {
      event.meetings.push(meeting);
    }

    const addedEvent = await event.save();

    /// 2nd option: Saving with Repository
    // const addedEvent = await Event.getRepository().save(event);

    return addedEvent;
  }
}
