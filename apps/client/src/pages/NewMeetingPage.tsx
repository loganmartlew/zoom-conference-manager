import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import MeetingInput from '../features/Meetings/MeetingForm';

const NewMeetingPage: FC = () => {
  return (
    <Box sx={{ display: 'grid', placeContent: 'center' }}>
      <Typography variant='h3' sx={{ my: 3 }}>
        New Meeting
      </Typography>
      <MeetingInput />
    </Box>
  );
};

export default NewMeetingPage;
