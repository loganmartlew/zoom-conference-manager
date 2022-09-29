import { FC } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import dayjs from 'dayjs';
import { useAllEvents } from '../features/Events/api/getEvents';

const CalendarPage: FC = () => {
  const { data: events } = useAllEvents();
  if (!events) {
    return <h1>No events</h1>;
  }
  console.log(events);

  return (
    <div>
      <Scheduler
        view='month'
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
        events={events.map((event) => ({
          event_id: event.id,
          title: event.name,
          start: dayjs(event.startDate, 'YYYY-MM-DD').toDate(),
          end: dayjs(event.endDate, 'YYYY-MM-DD').toDate(),
        }))}
      />
    </div>
  );
};

export default CalendarPage;
