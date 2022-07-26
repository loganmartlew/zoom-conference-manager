import { FC, useState } from 'react';
import { CircularProgress, Collapse, Alert, AlertTitle } from '@mui/material';
import { useAllEvents } from '../Events/api/getEvents';
import RecordingCard from './RecordingCard';

const EventsList: FC = () => {
  const { data: events, isLoading, isError } = useAllEvents();
  const [showError, setShowError] = useState(true);
  const [showNoEvents, setShowNoEvents] = useState(true);

  console.log(events);

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

  return (
    <>
      {events?.map((event) => {
        return (
          <RecordingCard
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
