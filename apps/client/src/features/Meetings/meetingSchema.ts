import { object, string, date, number } from 'yup';

const meetingSchema = object({
  event: string().required('Must select Event.'),
  name: string().required('Name is required.'),
  description: string().required('Description is required.'),
  meetingDate: date()
    .nullable()
    .typeError('Invalid date.')
    .required('Start date is required.'),
  meetingDuration: number()
    .required('Meeting duration is required.')
    .positive('Number must be positive.')
    .min(1, 'Meeting duration cannot be less than 1 minute.'),
});

export default meetingSchema;
