import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useEventNames } from '../Events/api/getEventNames';
import meetingSchema from './meetingSchema';

export interface IFormInput {
  event: string;
  name: string;
  description: string;
  meetingDate: Date;
  meetingDuration: number;
}

export const useMeetingForm = () => {
  const form = useForm<IFormInput>({
    defaultValues: {
      event: '',
      name: '',
      description: '',
      meetingDate: dayjs().toDate(),
      meetingDuration: 0,
    },
    resolver: yupResolver(meetingSchema),
  });

  const { data: eventNames } = useEventNames();

  return { ...form, eventNames };
};
