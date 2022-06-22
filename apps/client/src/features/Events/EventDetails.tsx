import { FC } from 'react';
import { IEvent } from '@zoom-conference-manager/types';
import { Stack, Typography } from '@mui/material';
import EventStatusBadge from './EventStatusBadge';

interface Props {
  event: IEvent | undefined;
  isLoading: boolean;
}

const EventDetails: FC<Props> = ({ event, isLoading }) => {
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!event) {
    return <Typography>Event not found</Typography>;
  }

  return (
    <Stack spacing={2}>
      <Stack direction='row' spacing={1} alignItems='center'>
        <EventStatusBadge status='draft' />
        <Typography variant='body2'>
          Event has not yet been published
        </Typography>
      </Stack>
      <Typography>{event.description}</Typography>
    </Stack>
  );
};

export default EventDetails;
