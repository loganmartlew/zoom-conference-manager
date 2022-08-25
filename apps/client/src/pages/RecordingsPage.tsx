import { FC } from 'react';
import { Typography } from '@mui/material';
import RecordingsList from '../features/Recordings/RecordingsList';

const RecordingsPage: FC = () => {
  return (
    <>
      <Typography variant='h3' sx={{ mb: 3 }}>
        Recent Events
      </Typography>
      <RecordingsList />
    </>
  );
};

export default RecordingsPage;
