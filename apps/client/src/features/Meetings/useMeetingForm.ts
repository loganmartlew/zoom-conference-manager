import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useEventNames } from '../Events/api/getEventNames';
import meetingSchema from './meetingSchema';

export interface IFormInput {
  name: string;
  startDate: Date;
  startTime: Date;
  endTime: Date;
  eventId: string;
}

export const useMeetingForm = (eventId: string | null) => {
  const form = useForm<IFormInput>({
    defaultValues: {
      name: '',
      startDate: dayjs().toDate(),
      startTime: new Date(0, 0, 0, 0, 0),
      endTime: new Date(0, 0, 0, 0, 0),
      eventId: eventId || '',
    },
    resolver: yupResolver(meetingSchema),
  });

  const { data: eventNames } = useEventNames();

  return { ...form, eventNames };
};
