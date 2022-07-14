import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import EventForm from '../features/Events/EventForm';

const NewEventPage: FC = () => {
  return (
    <Box sx={{ display: 'grid', placeContent: 'center' }}>
      <Typography variant='h3' sx={{ mb: 3 }}>
        New Event
      </Typography>
      <EventForm />
    </Box>
  );
};

export default NewEventPage;
