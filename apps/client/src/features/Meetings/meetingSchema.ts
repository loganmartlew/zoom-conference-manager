import { object, string, date, number } from 'yup';

const meetingSchema = object({
  ubid: string().required('UBID is required.'),
  name: string().required('Name is required.'),
  startDate: date()
    .typeError('Invalid date.')
    .required('Start date is required.'),
  startTime: string().required('Start time is required.'),
  endTime: string().required('End time is required'),
  eventId: string().required('Must select an Event.'),
});

export default meetingSchema;
