import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IEvent } from '@zoom-conference-manager/api-interfaces';
import { EventStatus } from '@zoom-conference-manager/types';
import { Stack, Typography, Button } from '@mui/material';
import { Add, Delete, Upload } from '@mui/icons-material';
import EventStatusBadge from './EventStatusBadge';
import MeetingsList from '../Meetings/MeetingsList';
import { usePublish } from './usePublish';
import PublishDialog from './PublishDialog';

interface Props {
  event: IEvent | undefined;
  isLoading: boolean;
}

const EventDetails: FC<Props> = ({ event, isLoading }) => {
  const { publish, unpublish } = usePublish(() => {});

  const publishEvent = () => {
    if (!event) return;
    publish(event.id);
  };

  const unpublishEvent = () => {
    if (!event) return;
    unpublish(event.id);
  };

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
          <EventStatusBadge status={event.status} />
          <Typography variant='body2'>
            Event has
            {event.status === EventStatus.DRAFT ? ' not yet ' : ' '}
            been published
          </Typography>
        </Stack>

        {event.status === EventStatus.DRAFT && (
          <PublishDialog type='publish' onConfirm={publishEvent} />
        )}
        {event.status === EventStatus.PUBLISHED && (
          <PublishDialog type='unpublish' onConfirm={unpublishEvent} />
        )}
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
