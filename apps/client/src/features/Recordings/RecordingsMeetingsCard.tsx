import { FC, useState } from 'react';
import { IMeeting } from '@zoom-conference-manager/api-interfaces';
import dayjs from 'dayjs';
import {
  Paper,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';

interface Props {
  meeting: IMeeting;
}

const RecordingsMeetingsCard: FC<Props> = ({ meeting }) => {
  const dateTime = dayjs(meeting.startDateTime);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Button variant='outlined' onClick={handleClickOpen}>
            Get Recording
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle>Copy Recording Link</DialogTitle>
            <DialogContent>
              <Stack direction='row' spacing={2}>
                <TextField
                  disabled
                  name='recordingLink'
                  label='Recording Link'
                  defaultValue='Link goes here :)'
                />
                <Tooltip title='Copy to Clipboard'>
                  <IconButton size='small' color='primary'>
                    <ContentPasteGoIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RecordingsMeetingsCard;
