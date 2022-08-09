import { FC } from 'react';
import { IEvent } from '@zoom-conference-manager/api-interfaces';
import { Link } from 'react-router-dom';
import { Paper, Stack, Typography, Button } from '@mui/material';
import { Groups } from '@mui/icons-material';
import EventStatusBadge from './EventStatusBadge';

interface Props {
  event: IEvent;
}

const EventCard: FC<Props> = ({ event }) => {
  return (
    <Paper
      sx={{
        padding: '1.5em',
      }}
      elevation={3}
    >
      <Stack spacing={2}>
        <Typography variant='h5' fontWeight={500} mr={3}>
          {event.name}
        </Typography>
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
