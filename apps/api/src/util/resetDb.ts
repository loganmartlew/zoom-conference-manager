import Meeting from '../entities/Meeting';
import ZoomUser from '../entities/ZoomUser';
import EventService from '../services/EventService';

const resetDb = async () => {
  const events = await EventService.getAll();
  await Promise.all(events.map((event) => EventService.delete(event.id)));
  console.log('Events cleared');

  await Meeting.clear();
  console.log('Meetings cleared');

  await ZoomUser.clear();
  console.log('ZoomUsers cleared');
};

export default resetDb;
