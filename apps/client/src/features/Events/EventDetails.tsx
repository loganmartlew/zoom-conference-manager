import { FC } from 'react';
import { IEvent } from '@zoom-conference-manager/types';
import { Stack, Typography } from '@mui/material';

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
    <Stack>
      <Typography>{event.description}</Typography>
    </Stack>
  );
};

export default EventDetails;
