import { VideoFile } from '@mui/icons-material';
import { Typography, Button, Stack } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { environment } from '../environments/environment';
import { useEvent } from '../features/Events/api/getEvent';
import RecordingsDetails from '../features/Recordings/RecordingsDetails';

const RecordingsDetailsPage: FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useEvent(id || '');

  return (
    <>
      <Stack direction='row' spacing={3} alignItems='center' sx={{ mb: 3 }}>
        <Typography variant='h3'>{data?.name || 'Event Details'}</Typography>
        <Button
          component='a'
          href={`${environment.apiUrl}/events/${id}/recordings`}
          target='_blank'
          variant='contained'
          startIcon={<VideoFile />}
        >
          Get All Recordings
        </Button>
      </Stack>
      <RecordingsDetails event={data} isLoading={isLoading} />
    </>
  );
};

export default RecordingsDetailsPage;
