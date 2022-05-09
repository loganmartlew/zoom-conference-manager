import { object, string, date } from 'yup';

const eventDtoSchema = object({
  name: string().required('Name is required'),
  description: string().required('Description is required'),
  startDate: date()
    .nullable()
    .typeError('Invalid date')
    .required('Start date is required'),
  endDate: date()
    .nullable()
    .typeError('Invalid date')
    .required('End date is required')
    .test(
      'before_start_date_test',
      'End date must be after start date',
      // eslint-disable-next-line func-names
      function (value) {
        const { startDate } = this.parent;
        if (!value) return true;
        return value >= startDate;
      }
    ),
});

export default eventDtoSchema;
