import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import EventsList from '../features/Events/EventsList';

const RecordingsPage: FC = () => {
  return (
    <Box sx={{ display: 'grid', placeContent: 'center', minHeight: '100vh' }}>
      <Typography variant='h3' sx={{ mb: 3 }}>
        Recent Events
        <EventsList />
      </Typography>
      <Box sx={{ mb: 15 }} />
    </Box>
  );
};

export default RecordingsPage;
