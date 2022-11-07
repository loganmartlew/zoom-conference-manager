import { EventDTO, ZoomUserDTO } from '@zoom-conference-manager/api-interfaces';
import dayjs from 'dayjs';
import EventService from '../services/EventService';
import ZoomUserService from '../services/ZoomUserService';

const dateFormat = 'YYYY-MM-DD';

const eventDto: EventDTO = {
  ubid: '12345',
  name: 'OWASP Event',
  description:
    'An event about how AWS and cloud infrastructure can improve your product.',
  startDate: dayjs()
    .set('year', 2022)
    .set('month', 7)
    .set('date', 5)
    .format(dateFormat),
  endDate: dayjs()
    .set('year', 2022)
    .set('month', 7)
    .set('date', 8)
    .format(dateFormat),
};

const user1Dto: ZoomUserDTO = {
  name: 'Henry Matthews',
  email: 'h.matthews@autuni.ac.nz',
};
const user2Dto: ZoomUserDTO = {
  name: 'John Smith',
  email: 'johnsmith123@autuni.ac.nz',
};
const user3Dto: ZoomUserDTO = {
  name: 'Jane Doe',
  email: 'janedoe123@autuni.ac.nz',
};

const seedDb = async () => {
  await EventService.create(eventDto);
  await ZoomUserService.create(user1Dto);
  await ZoomUserService.create(user2Dto);
  await ZoomUserService.create(user3Dto);
};

export default seedDb;
