import { FC, useState } from 'react';
import { IMeeting } from '@zoom-conference-manager/api-interfaces';
import dayjs from 'dayjs';
import { Paper, Stack, Typography, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { useDeleteMeeting } from './api/deleteMeeting';

interface Props {
  meeting: IMeeting;
}

const MeetingCard: FC<Props> = ({ meeting }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onDeleteSuccess = () => {
    setOpen(false);
  };

  const onDeleteError = (err: unknown) => {
    console.log(err);
  };

  const { mutate } = useDeleteMeeting(onDeleteSuccess, onDeleteError);

  const deleteEvent = () => {
    mutate(meeting.id);
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

          <IconButton size='small' color='primary'>
            <Edit fontSize='small' />
          </IconButton>

          <IconButton
            data-testid={`delete-meeting-${meeting.id}`}
            size='small'
            color='error'
            onClick={() => setOpen(true)}
          >
            <Delete fontSize='small' />
          </IconButton>
          <ConfirmationDialog
            open={open}
            handleClose={() => setOpen(false)}
            onConfirm={deleteEvent}
            title='Delete Meeting'
            text='Are you sure you want to delete the meeting?'
          />
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
              {dayjs(meeting.startDateTime).format('YYYY-MM-DD')}
            </Typography>
          </Typography>

          <Stack spacing={4} direction='row'>
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
                {dayjs(meeting.startDateTime).format('HHmm')}
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
                {dayjs(meeting.endDateTime).format('HHmm')}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default MeetingCard;
