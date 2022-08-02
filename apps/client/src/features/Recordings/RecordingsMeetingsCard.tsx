import { FC } from 'react';
import { IMeeting } from '@zoom-conference-manager/api-interfaces';
import dayjs from 'dayjs';
import { Paper, Stack, Typography, Button } from '@mui/material';

interface Props {
  meeting: IMeeting;
}

const RecordingsMeetingsCard: FC<Props> = ({ meeting }) => {
  const dateTime = dayjs(meeting.startDateTime);

  return (
    <Paper
      sx={{
        padding: '1.5em',
      }}
      elevation={3}
    >
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
            <Typography variant='body2'>{dateTime.format('HH:mm')}</Typography>
          </Typography>

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
          <Button variant='outlined'>Get Recording</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RecordingsMeetingsCard;
