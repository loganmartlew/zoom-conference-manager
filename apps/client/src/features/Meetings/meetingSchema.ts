import { object, string, date, number } from 'yup';

const meetingSchema = object({
  ubid: string().required('UBID is required.'),
  name: string().required('Name is required.'),
  startDate: date()
    .typeError('Invalid date.')
    .required('Start date is required.'),
  startTime: string()
    .required('Start time is required.')
    .length(5, 'Must be in format XX:XX.')
    .matches(/[0-9]{2}:[0-9]{2}/, 'Must be in format XX:XX.'),
  duration: number()
    .required('Meeting duration is required.')
    .positive('Number must be positive.')
    .min(1, 'Meeting duration cannot be less than 1 minute.'),
  eventId: string().required('Must select an Event.'),
});

export default meetingSchema;
