import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import zoomUserDtoSchema from './zoomUserDtoSchema';

export interface IFormInput {
  name: string;
  email: string;
}

export const useUserForm = () => {
  return useForm<IFormInput>({
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: yupResolver(zoomUserDtoSchema),
  });
};
