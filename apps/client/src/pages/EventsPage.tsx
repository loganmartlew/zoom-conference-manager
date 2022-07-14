import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import EventsList from '../features/Events/EventsList';

const EventsPage: FC = () => {
  return (
    <>
      <Stack direction='row' spacing={3} alignItems='center' sx={{ mb: 3 }}>
        <Typography variant='h3'>Events</Typography>
        <Button
          component={Link}
          to='/new-event'
          variant='contained'
          startIcon={<Add />}
        >
          New Event
        </Button>
      </Stack>
      <EventsList />
    </>
  );
};

export default EventsPage;
