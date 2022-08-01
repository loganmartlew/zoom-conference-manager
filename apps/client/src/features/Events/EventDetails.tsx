import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { IEvent } from '@zoom-conference-manager/api-interfaces';
import { Stack, Typography, Button } from '@mui/material';
import { Add, Delete, Upload } from '@mui/icons-material';
import EventStatusBadge from './EventStatusBadge';
import MeetingsList from '../Meetings/MeetingsList';
import ConfirmDialog from './ConfirmDialog';

interface Props {
  event: IEvent | undefined;
  isLoading: boolean;
}

const EventDetails: FC<Props> = ({ event, isLoading }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
        <Button
          onClick={() => setDialogOpen(true)}
          variant='contained'
          size='small'
          sx={{ width: 'max-content' }}
        >
          Publish
        </Button>
        <ConfirmDialog
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          onConfirm={() => console.log('Published')}
        />
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
        <Stack direction='row' spacing={1} sx={{ mb: '1em !important' }}>
          <Button
            component={Link}
            to={`/new-meeting?event=${event.id}`}
            variant='contained'
            size='small'
            startIcon={<Add />}
          >
            Add Meeting
          </Button>
          <Button variant='outlined' size='small' startIcon={<Upload />}>
            Upload Meetings
          </Button>
          <Button
            variant='contained'
            size='small'
            color='error'
            startIcon={<Delete />}
          >
            Clear Meetings
          </Button>
        </Stack>
        <MeetingsList meetings={event.meetings} />
      </Stack>
    </Stack>
  );
};

export default EventDetails;
