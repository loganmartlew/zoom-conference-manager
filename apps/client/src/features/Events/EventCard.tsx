import { FC } from 'react';
import { Button, Paper, Stack, Typography, styled } from '@mui/material';

interface EventCardProps {
  name: string;
  desc: string;
  start: string;
  end: string;
}

const EventContainer = styled(Paper)(() => ({
  width: '70%',
  padding: '0.5rem',
}));

const InfoStack = styled(Stack)(() => ({
  gap: '1rem',
}));

const EventCard: FC<EventCardProps> = (props) => {
  const { name, desc, start, end } = props;
  return (
    <EventContainer elevation={3}>
      <Stack direction='row' justifyContent='space-between'>
        <InfoStack sx={{ alignItems: 'center' }}>
          <Typography variant='h5'>{name}</Typography>
          <Typography variant='body2'>{desc}</Typography>
        </InfoStack>
        <InfoStack>
          <Typography>{start}</Typography>
          <Typography>{end}</Typography>
        </InfoStack>
      </Stack>
    </EventContainer>
  );
};

export default EventCard;
