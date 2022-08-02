import { FC } from 'react';
import { IMeeting } from '@zoom-conference-manager/api-interfaces';
import dayjs from 'dayjs';
import { Paper, Stack, Typography, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

interface Props {
  meeting: IMeeting;
}

const MeetingCard: FC<Props> = ({ meeting }) => {
  const dateTime = dayjs(meeting.startDateTime);
  return (
    <Paper
      sx={{
        padding: '1.5em',
      }}
      elevation={3}
    >
      <Stack spacing={1}>
        <Stack direction='row' alignItems='center'>
          <Typography variant='h6' fontSize='1.5rem' sx={{ mr: 1 }}>
            {meeting.name}
          </Typography>

          <IconButton size='small' color='primary'>
            <Edit fontSize='small' />
          </IconButton>

          <IconButton size='small' color='error'>
            <Delete fontSize='small' />
          </IconButton>
        </Stack>

        <Stack direction='row' spacing={4}>
          <Stack spacing={2}>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3em',
                width: 'max-content',
              }}
            >
              UBID:
              <Typography variant='body2' display='inline'>
                {meeting.ubid}
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
                {dateTime.format('HH:mm')}
              </Typography>
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3em',
                width: 'max-content',
              }}
            >
              Date:
              <Typography variant='body2'>
                {dateTime.format('YYYY-MM-DD')}
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
                {dateTime.add(meeting.duration, 'minute').format('HH:mm')}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default MeetingCard;
