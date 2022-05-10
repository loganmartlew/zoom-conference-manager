import { FC } from 'react';
import { Button, Paper, Typography } from '@mui/material';

interface EventCardProps {
  name: string;
  desc: string;
  start: string;
  end: string;
}

const EventCard: FC<EventCardProps> = (props) => {
  const { name, desc, start, end } = props;
  return (
    <Paper component={Button}>
      <Typography>{name}</Typography>
      <Typography>{desc}</Typography>
      <Typography>{start}</Typography>
      <Typography>{end}</Typography>
    </Paper>
  );
};

export default EventCard;
