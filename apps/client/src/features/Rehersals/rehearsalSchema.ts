import { object, string, date } from 'yup';

const rehearsalSchema = object({
  name: string().required('Name is required.'),
  startDateTime: date()
    .required('Start date is required')
    .typeError('Invalid date.'),
  endDateTime: date()
    .required('End date is required')
    .typeError('Invalid date.'),
  presenter: string().required('Name of presenter is required.'),
  presEmail: string().required('Presenter email is required.'),
});

export default rehearsalSchema;
