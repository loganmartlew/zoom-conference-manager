import { FC } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import { DisabledByDefault } from '@mui/icons-material';
import { Button } from '@mui/material';

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
        // eslint-disable-next-line react/no-unstable-nested-components
        cellRenderer: ({ start }) => {
          const hour = start.getHours();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const disabled = hour === 14;
          return <Button />;
        },
      }}
      week={{
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 1,
        startHour: 0,
        endHour: 23,
        step: 60,
        // eslint-disable-next-line react/no-unstable-nested-components
        cellRenderer: ({ start }) => {
          const hour = start.getHours();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const disabled = hour === 14;
          return <Button />;
        },
      }}
      day={{
        startHour: 0,
        endHour: 23,
        step: 60,
        // eslint-disable-next-line react/no-unstable-nested-components
        cellRenderer: ({ start }) => {
          const hour = start.getHours();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const disabled = hour === 14;
          return <Button />;
        },
      }}
      events={calendarEvents}
    />
  );
};

export default Calendar;
