import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import EventInput from '../features/Events/EventForm';

const NewEventPage: FC = () => {
  return (
    <Box sx={{ display: 'grid', placeContent: 'center' }}>
      <Typography variant='h3' sx={{ my: 3 }}>
        New Event
      </Typography>
      <EventInput />
      <Box sx={{ mb: 15 }} />
    </Box>
  );
};

export default NewEventPage;
