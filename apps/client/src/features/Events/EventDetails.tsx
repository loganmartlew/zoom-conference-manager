import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IEvent } from '@zoom-conference-manager/types';
import { Stack, Typography, Button } from '@mui/material';
import { Add, Upload } from '@mui/icons-material';
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
      <Stack spacing={1}>
        <Typography variant='h5'>Status</Typography>
        <Stack direction='row' spacing={1} alignItems='center'>
          <EventStatusBadge status='draft' />
          <Typography variant='body2'>
            Event has not yet been published
          </Typography>
        </Stack>
        <Button variant='contained' size='small' sx={{ width: 'max-content' }}>
          Publish
        </Button>
      </Stack>

      <Stack spacing={1}>
        <Typography variant='h5'>Dates</Typography>
        <Typography>{`${event.startDate} - ${event.endDate}`}</Typography>
        <Button variant='outlined' size='small' sx={{ width: 'max-content' }}>
          View On Calendar
        </Button>
      </Stack>

      <Stack spacing={1}>
        <Typography variant='h5'>Description</Typography>
        <Typography>{event.description}</Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant='h5'>Meetings</Typography>
        <Stack direction='row' spacing={1}>
          <Button
            component={Link}
            to={`/new-event?event=${event.id}`}
            variant='contained'
            size='small'
            startIcon={<Add />}
          >
            Add Meeting
          </Button>
          <Button variant='outlined' size='small' startIcon={<Upload />}>
            Upload Meetings
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EventDetails;
