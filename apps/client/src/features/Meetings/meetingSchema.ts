import { object, string, date } from 'yup';

const meetingSchema = object({
  name: string().required('Name is required.'),
  startDate: date()
    .typeError('Invalid date.')
    .required('Start date is required.'),
  startTime: string()
    .required('Start time is required.')
    .matches(/^\d\d:\d\d$/),
  endTime: string()
    .required('End time is required')
    .matches(/^\d\d:\d\d$/),
  eventId: string().required('Must select an Event.'),
});

export default meetingSchema;
