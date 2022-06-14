import { FC } from 'react';
import { Paper, Stack, Typography, styled } from '@mui/material';

interface EventCardProps {
  name: string;
  desc: string;
  start: string;
  end: string;
}

const EventCard: FC<EventCardProps> = (props) => {
  const { name, desc, start, end } = props;
  return (
    <Paper
      sx={{
        padding: '1.5em',
        maxWidth: '100ch',
      }}
      elevation={3}
    >
      <Stack direction='row' justifyContent='space-between'>
        <Stack spacing={1}>
          <Stack direction='row' alignItems='center' flexWrap='wrap'>
            <Typography variant='h5' fontWeight={500} mr={3}>
              {name}
            </Typography>
            <Typography
              sx={{ width: 'max-content', whiteSpace: 'noWrap' }}
            >{`${start} - ${end}`}</Typography>
          </Stack>
          <Typography variant='body1'>{desc}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default EventCard;
