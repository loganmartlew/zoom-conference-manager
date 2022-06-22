import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useEvent } from '../features/Events/api/getEvent';

const EventDetailsPage: FC = () => {
  const { id } = useParams();
  const { data } = useEvent(id || '');

  return (
    <>
      <Typography variant='h3' sx={{ mb: 3 }}>
        {data?.event?.name || 'Event Details'}
      </Typography>
    </>
  );
};

export default EventDetailsPage;
