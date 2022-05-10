import { FC } from 'react';
import { CircularProgress, Alert, AlertTitle } from '@mui/material';
import { useAllEvents } from './api/getEvents';
import EventCard from './EventCard';

const EventsList: FC = () => {
  const { data: events, isLoading, isError } = useAllEvents();

  if (isError) {
    return (
      <Alert onClose={() => {}} severity='error' variant='outlined'>
        <AlertTitle>Error</AlertTitle>An error occurred
      </Alert>
    );
  }

  if (isLoading) {
    return <CircularProgress color='secondary' />;
  }

  if (events && events?.length < 1) {
    return (
      <Alert onClose={() => {}} severity='success' variant='outlined'>
        <AlertTitle>No Events</AlertTitle>
        No events found...
      </Alert>
    );
  }

  return (
    <>
      {events?.map((event) => {
        return (
          <EventCard
            key={event.id}
            name={event.name}
            desc={event.description}
            start={event.startDate}
            end={event.endDate}
          />
        );
      })}
    </>
  );
};

export default EventsList;
