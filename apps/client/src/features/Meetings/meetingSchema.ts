import { object, string, date, number } from 'yup';

const meetingSchema = object({
  ubid: string().required('UBID is required.'),
  name: string().required('Name is required.'),
  startDate: date()
    .nullable()
    .typeError('Invalid date.')
    .required('Start date is required.'),
  duration: number()
    .required('Meeting duration is required.')
    .positive('Number must be positive.')
    .min(1, 'Meeting duration cannot be less than 1 minute.'),
  eventId: string().required('Must select Event.'),
});

export default meetingSchema;
