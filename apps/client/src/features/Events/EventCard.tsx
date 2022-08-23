import { FC, useState } from 'react';
import { IEvent } from '@zoom-conference-manager/api-interfaces';
import { Link } from 'react-router-dom';
import { Paper, Stack, Typography, Button, IconButton } from '@mui/material';
import { Groups, Delete } from '@mui/icons-material';
import EventStatusBadge from './EventStatusBadge';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { useDeleteEvent } from './api/deleteEvent';

interface Props {
  event: IEvent;
}

const EventCard: FC<Props> = ({ event }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onDeleteSuccess = () => {
    setOpen(false);
  };

  const onDeleteError = (err: unknown) => {
    console.log(err);
  };

  const { mutate } = useDeleteEvent(onDeleteSuccess, onDeleteError);

  const deleteEvent = () => {
    mutate(event.id);
  };

  return (
    <Paper
      sx={{
        padding: '1.5em',
      }}
      elevation={3}
    >
      <Stack spacing={2}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Typography variant='h5' fontWeight={500}>
            {event.name}
          </Typography>
          <IconButton color='error' onClick={() => setOpen(true)}>
            <Delete />
          </IconButton>
          <ConfirmationDialog
            open={open}
            handleClose={() => setOpen(false)}
            onConfirm={deleteEvent}
            title='Delete Event'
            text='Are you sure you want to delete the event?'
          />
        </Stack>
        <Stack direction='row' spacing={2}>
          <EventStatusBadge status={event.status} />
          <Stack direction='row' spacing={1}>
            <Groups />
            <Typography>0 Meetings</Typography>
          </Stack>
        </Stack>
        <Typography
          sx={{ width: 'max-content', whiteSpace: 'noWrap' }}
        >{`${event.startDate} - ${event.endDate}`}</Typography>
        <Typography variant='body1'>{event.description}</Typography>
        <Button
          component={Link}
          to={`/events/${event.id}`}
          variant='outlined'
          sx={{ width: 'max-content' }}
        >
          View Details
        </Button>
      </Stack>
    </Paper>
  );
};

export default EventCard;
