import { FC } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';

interface Props {
  calendarEvents: any[];
  initialDate?: Date;
  initialView: 'month' | 'week' | 'day';
}

const Calendar: FC<Props> = ({ calendarEvents, initialDate, initialView }) => {
  return (
    <Scheduler
      view={initialView}
      selectedDate={initialDate || new Date()}
      month={{
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 1,
        startHour: 0,
        endHour: 23,
      }}
      week={{
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 1,
        startHour: 0,
        endHour: 23,
        step: 60,
      }}
      day={{
        startHour: 0,
        endHour: 23,
        step: 60,
      }}
      events={calendarEvents}
    />
  );
};

export default Calendar;
