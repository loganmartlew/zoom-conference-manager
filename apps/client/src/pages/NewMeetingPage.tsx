import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import MeetingInput from '../features/Meetings/MeetingForm';

const NewMeetingPage: FC = () => {
    return  (
        <Box sx={{ display: 'grid', placeContent: 'center', minHeight: '100vh' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
                New Meeting
            </Typography>
            <MeetingInput />
        <Box sx={{ mb: 15 }} />
    </Box>
    );
};

export default NewMeetingPage;