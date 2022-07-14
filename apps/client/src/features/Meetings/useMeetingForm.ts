import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useEventNames } from '../Events/api/getEventNames';
import meetingSchema from './meetingSchema';

export interface IFormInput {
  ubid: string;
  name: string;
  startDate: Date;
  duration: number;
  eventId: string;
}

export const useMeetingForm = () => {
  const form = useForm<IFormInput>({
    defaultValues: {
      ubid: '',
      name: '',
      startDate: dayjs().toDate(),
      duration: 0,
      eventId: '',
    },
    resolver: yupResolver(meetingSchema),
  });

  const { data: eventNames } = useEventNames();

  return { ...form, eventNames };
};
