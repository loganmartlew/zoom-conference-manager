import { Typography } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useEvent } from '../features/Events/api/getEvent';
import RecordingsDetails from '../features/Recordings/RecordingsDetails';

const RecordingsDetailsPage: FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useEvent(id || '');

  return (
    <>
      <Typography
        variant='h3'
        sx={{
          mb: 3,
        }}
      >
        {data?.name || 'Event Details'}
      </Typography>
      <RecordingsDetails event={data} isLoading={isLoading} />
    </>
  );
};

export default RecordingsDetailsPage;
