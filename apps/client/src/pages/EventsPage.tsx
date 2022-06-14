import { FC } from 'react';
import { Typography } from '@mui/material';
import EventsList from '../features/Events/EventsList';

const EventsPage: FC = () => {
  return (
    <>
      <Typography variant='h3' sx={{ my: 3 }}>
        Events
      </Typography>
      <EventsList />
    </>
  );
};

export default EventsPage;
