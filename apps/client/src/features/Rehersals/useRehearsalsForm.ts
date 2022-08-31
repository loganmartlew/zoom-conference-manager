import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import rehearsalSchema from './rehearsalSchema';

export interface IFormInput {
  name: string;
  startDate: Date;
  startTime: Date;
  endTime: Date;
  presenter: string;
  presEmail: string;
  rehearsalId: string;
}

export const useRehearsalsForm = () => {
  const form = useForm<IFormInput>({
    defaultValues: {
      name: '',
      startDate: dayjs().toDate(),
      startTime: new Date(0, 0, 0, 0, 0),
      endTime: new Date(0, 0, 0, 0, 0),
      presenter: '',
      presEmail: '',
      rehearsalId: '',
    },
    resolver: yupResolver(rehearsalSchema),
  });

  return { ...form };
};
