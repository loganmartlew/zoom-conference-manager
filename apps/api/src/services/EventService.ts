import Event from '../entities/Event';

export default class EventService {
  static async getAll() {
    const events = await Event.find();
    return events;
  }
}
