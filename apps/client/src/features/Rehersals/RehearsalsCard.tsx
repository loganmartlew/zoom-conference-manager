import { FC } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface RehearsalsCardProps {
  name: string;
  startDate: Date;
  startTime: Date;
  endTime: Date;
  presenter: string;
}

const RehearsalsCard: FC<RehearsalsCardProps> = (props) => {
  const { name, startDate, startTime, endTime, presenter } = props;

  return (
    <Paper
      sx={{
        padding: '1.5em',
      }}
      elevation={3}
    >
      <Stack spacing={2}>
        <Stack>
          <Typography variant='h5' fontWeight={500} mr={3}>
            {name}
          </Typography>

          <Typography variant='h6' fontWeight={500} mr={3}>
            {presenter}
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3em',
              width: 'max-content',
            }}
          >
            Start Date:
            <Typography variant='body2'>
              {dayjs(startDate).format('YYYY-MM-DD')}
            </Typography>
          </Typography>

          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3em',
              width: 'max-content',
            }}
          >
            Start Time:
            <Typography variant='body2'>
              {dayjs(startTime).format('HH:mm')}
            </Typography>
          </Typography>

          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3em',
              width: 'max-content',
            }}
          >
            End Time:
            <Typography variant='body2'>
              {dayjs(endTime).format('HH:mm')}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RehearsalsCard;
