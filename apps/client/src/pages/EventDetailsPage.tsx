import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useEvent } from '../features/Events/api/getEvent';
import EventDetails from '../features/Events/EventDetails';

const EventDetailsPage: FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useEvent(id || '');

  return (
    <>
      <Typography variant='h3' sx={{ mb: 3 }}>
        {data?.name || 'Event Details'}
      </Typography>
      <EventDetails event={data} isLoading={isLoading} />
    </>
  );
};

export default EventDetailsPage;
