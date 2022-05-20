import { FC } from 'react';
import { Paper, Button, Stack, Typography, styled } from '@mui/material';

interface EventCardProps {
  name: string;
  desc: string;
  start: string;
  end: string;
}

const InfoStack = styled(Stack)(() => ({
  gap: '1rem',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}));

const GenericTypography = styled(Typography)(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const EventCard: FC<EventCardProps> = (props) => {
  const { name, desc, start, end } = props;
  return (
    <Paper
      sx={{
        width: '85%',
        padding: '0.8rem',
        marginTop: '1rem',
        display: 'block',
        textAlign: 'unset',
      }}
      component={Button}
      elevation={3}
    >
      <Stack direction='row' justifyContent='space-between'>
        <InfoStack width='90%' direction='column' justifyContent='space-evenly'>
          <GenericTypography variant='h5'>{name}</GenericTypography>
          <GenericTypography variant='body2' width='50%'>
            {desc}
          </GenericTypography>
        </InfoStack>
        <InfoStack width='10%' direction='column' justifyContent='space-evenly'>
          <GenericTypography alignSelf='end' variant='body2'>
            {start}
          </GenericTypography>
          <GenericTypography alignSelf='end' variant='body2'>
            {end}
          </GenericTypography>
        </InfoStack>
      </Stack>
    </Paper>
  );
};

export default EventCard;
