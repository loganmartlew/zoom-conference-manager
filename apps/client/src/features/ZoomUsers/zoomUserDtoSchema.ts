import { object, string } from 'yup';

const zoomUserDtoSchema = object({
  name: string().required('Name is required'),
  email: string().required('Email is required').email('Invalid email'),
});

export default zoomUserDtoSchema;
