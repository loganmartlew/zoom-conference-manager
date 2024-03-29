import { FC, useState } from 'react';
import {
  CircularProgress,
  Collapse,
  Alert,
  AlertTitle,
  Stack,
} from '@mui/material';
import { useAllEvents } from './api/getEvents';
import EventCard from './EventCard';

const EventsList: FC = () => {
  const { data: events, isLoading, isError } = useAllEvents();
  const [showError, setShowError] = useState(true);
  const [showNoEvents, setShowNoEvents] = useState(true);

  if (isError) {
    return (
      <Collapse in={showError}>
        <Alert
          onClose={() => {
            setShowError(false);
          }}
          severity='error'
          variant='outlined'
        >
          <AlertTitle>Error</AlertTitle>An error occurred
        </Alert>
      </Collapse>
    );
  }

  if (isLoading) {
    return <CircularProgress color='secondary' />;
  }

  if (events && events?.length < 1) {
    return (
      <Collapse in={showNoEvents}>
        <Alert
          onClose={() => {
            setShowNoEvents(false);
          }}
          severity='success'
          variant='outlined'
        >
          <AlertTitle>No Events</AlertTitle>
          No events found...
        </Alert>
      </Collapse>
    );
  }

  if (!events) {
    return (
      <Collapse in={showNoEvents}>
        <Alert
          onClose={() => {
            setShowNoEvents(false);
          }}
          severity='success'
          variant='outlined'
        >
          <AlertTitle>No Events</AlertTitle>
          No events found...
        </Alert>
      </Collapse>
    );
  }

  return (
    <Stack spacing={3}>
      {events.map((event) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </Stack>
  );
};

export default EventsList;
