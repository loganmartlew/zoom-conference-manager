import { object, string, date } from 'yup';

const rehearsalSchema = object({
  name: string().required('Name is required.'),
  startDate: date()
    .required('Start date is required')
    .typeError('Invalid date.'),
  startTime: string().required('Start time is required'),
  endTime: string().required('End time is required'),
  presenter: string().required('Name of presenter is required.'),
  presEmail: string().required('Presenter email is required.'),
  rehearsalID: string().required('Rehearsal ID is required.'),
});

export default rehearsalSchema;
