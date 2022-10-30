import { IEvent } from '@zoom-conference-manager/api-interfaces';
import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { MenuItem, Select, SelectChangeEvent, Tab, Tabs } from '@mui/material';
import { useAllEvents } from '../features/Events/api/getEvents';
import Calendar from '../features/calendar/Calendar';

const CalendarPage: FC = () => {
  const [view, setView] = useState<'events' | 'meetings'>('events');
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const { data: events } = useAllEvents();

  useEffect(() => {
    if (!events) return;

    if (events.length > 0) {
      setSelectedEvent(events[0]);
    }
  }, [events]);

  if (!events) {
    return <h1>No events</h1>;
  }

  const handleEventChange = (event: SelectChangeEvent) => {
    const eventId = event.target.value as string;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const eventToSelect = events.find((event) => event.id === eventId);

    if (eventToSelect) {
      setSelectedEvent(eventToSelect);
    }
  };

  return (
    <>
      <Tabs
        value={view}
        onChange={(_, newValue) => setView(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label='Events' value='events' />
        <Tab label='Meetings' value='meetings' />
      </Tabs>
      {view === 'events' && (
        <Calendar
          initialView='month'
          calendarEvents={events.map((event) => ({
            event_id: event.id,
            title: event.name,
            start: dayjs(event.startDate, 'YYYY-MM-DD').toDate(),
            end: dayjs(event.endDate, 'YYYY-MM-DD').toDate(),
            // state: state obj,
          }))}
        />
      )}
      {view === 'meetings' && (
        <>
          <Select value={selectedEvent?.id} onChange={handleEventChange}>
            {events.map((event) => (
              <MenuItem value={event.id} key={event.id}>
                {event.name}
              </MenuItem>
            ))}
          </Select>
          <Calendar
            initialView='day'
            initialDate={dayjs(selectedEvent?.startDate).toDate()}
            calendarEvents={
              selectedEvent?.meetings.map((meeting) => ({
                event_id: meeting.id,
                title: meeting.name,
                start: dayjs(meeting.startDateTime).toDate(),
                end: dayjs(meeting.endDateTime).toDate(),
              })) as any[]
            }
          />
        </>
      )}
    </>
  );
};

export default CalendarPage;

// <Calendar
//         initialView='month'
//         calendarEvents={events.map((event) => ({
//           event_id: event.id,
//           title: event.name,
//           start: dayjs(event.startDate, 'YYYY-MM-DD').toDate(),
//           end: dayjs(event.endDate, 'YYYY-MM-DD').toDate(),
//         }))}
//       />
