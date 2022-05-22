import { EventDTO } from '@zoom-conference-manager/api-interfaces';
import { IEventName } from '@zoom-conference-manager/types';
import Event from '../entities/Event';

export default class EventService {
  static async getAll() {
    const events = await Event.find();
    return events;
  }

  static async getNames() {
    const eventNames: IEventName[] = await Event.find({
      select: {
        id: true,
        name: true,
      },
    });

    return eventNames;
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
}
