import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Stack, Typography, Button } from '@mui/material';
import { Groups } from '@mui/icons-material';
import EventStatusBadge from './EventStatusBadge';

interface Props {
  id: string;
  name: string;
  desc: string;
  start: string;
  end: string;
}

const EventCard: FC<Props> = (props) => {
  const { id, name, desc, start, end } = props;
  return (
    <Paper
      sx={{
        padding: '1.5em',
        // maxWidth: '100ch',
      }}
      elevation={3}
    >
      <Stack spacing={2}>
        <Typography variant='h5' fontWeight={500} mr={3}>
          {name}
        </Typography>
        <Stack direction='row' spacing={2}>
          <EventStatusBadge status='draft' />
          <Stack direction='row' spacing={1}>
            <Groups />
            <Typography>0 Meetings</Typography>
          </Stack>
        </Stack>
        <Typography
          sx={{ width: 'max-content', whiteSpace: 'noWrap' }}
        >{`${start} - ${end}`}</Typography>
        <Typography variant='body1'>{desc}</Typography>
        <Button
          component={Link}
          to={`/events/${id}`}
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
