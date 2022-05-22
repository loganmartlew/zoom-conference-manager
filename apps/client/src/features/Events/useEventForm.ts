import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import eventDtoSchema from './eventDtoSchema';

export interface IFormInput {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export const useEventForm = () => {
  return useForm<IFormInput>({
    defaultValues: {
      name: '',
      description: '',
      startDate: dayjs().toDate(),
      endDate: dayjs().toDate(),
    },
    resolver: yupResolver(eventDtoSchema),
  });
};
