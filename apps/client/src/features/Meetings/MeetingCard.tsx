import { FC, useState } from 'react';
import { IMeeting } from '@zoom-conference-manager/api-interfaces';
import dayjs from 'dayjs';
import { Paper, Stack, Typography, IconButton, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { MeetingData } from './MeetingTypes/UpdateMeetingTypes';
import UpdateMeeting from './UpdateMeeting';
import { getMeetingData } from './api/getMeetingData';
import { updateMeetingData } from './api/updateMeetingData';

interface Props {
  meeting: IMeeting;
}

const MeetingCard: FC<Props> = ({ meeting }) => {
  const [showEditMeeting, setEditMeeting] = useState(false);
  const dateTime = dayjs(meeting.startDateTime);

  // This method converts the IMeeting type to MeetingData type
  // as required for the below component UpdateMeeting prop inputs.
  const convertToMeetingType = (currentMeeting: IMeeting): MeetingData => {
    const tempDate = dateTime.format('DD/mm/YYYY');
    const tempTime = dateTime.format('HHmm');
    const date = `${tempDate} ${tempTime}`;
    const convertedMeeting: MeetingData = {
      id: currentMeeting.ubid,
      name: currentMeeting.name,
      startDateTime: date,
      duration: meeting.duration,
    };
    return convertedMeeting;
  };

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
          {
            // used to determine icon color for editing meetings
            showEditMeeting ? (
              <IconButton
                onClick={() => {
                  setEditMeeting(!showEditMeeting);
                }}
                size='small'
                color='secondary'
              >
                <Edit fontSize='small' />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  setEditMeeting(!showEditMeeting);
                }}
                size='small'
                color='primary'
              >
                <Edit fontSize='small' />
              </IconButton>
            )
          }
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
              <Typography variant='body2'>{dateTime.format('HHmm')}</Typography>
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
                {dateTime.add(meeting.duration, 'minute').format('HHmm')}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
        <Box padding='1.5rem'>
          <Stack alignItems='flex-start' spacing={2}>
            {showEditMeeting && (
              <Box>
                <UpdateMeeting
                  meetingData={convertToMeetingType(meeting)}
                  updateMeetingData={updateMeetingData}
                  meetingId={meeting.ubid}
                  editOnRender={false}
                />
              </Box>
            )}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default MeetingCard;
