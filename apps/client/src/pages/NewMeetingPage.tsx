import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import MeetingForm from '../features/Meetings/MeetingForm';

const NewMeetingPage: FC = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('event');

  return (
    <Box sx={{ display: 'grid', placeContent: 'center' }}>
      <Typography variant='h3' sx={{ mb: 3 }}>
        New Meeting
      </Typography>
      <MeetingForm eventId={eventId} />
    </Box>
  );
};

export default NewMeetingPage;
