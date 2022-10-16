import { FC, useRef, useState } from 'react';
import { ApiError } from '@zoom-conference-manager/errors';
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
import copy from 'copy-to-clipboard';
import { Id, toast } from 'react-toastify';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import notificationSettings from '../../App/notificationSettings';
import { getMeetingRecording } from './api/getMeetingRecording';

interface Props {
  meeting: IMeeting;
}

const RecordingsMeetingsCard: FC<Props> = ({ meeting }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');

  const toastRef = useRef<Id | null>(null);

  const dateTime = dayjs(meeting.startDateTime);
  const dateTimeEnd = dayjs(meeting.endDateTime);

  const handleRequestRecording = async () => {
    toastRef.current = toast.loading(
      'Retrieving Recording...',
      notificationSettings
    );

    try {
      const recordingUrl = await getMeetingRecording(meeting.id);
      setUrl(recordingUrl);

      if (toastRef.current) {
        toast.update(toastRef.current, {
          render: 'Recording retrieved',
          type: toast.TYPE.SUCCESS,
          isLoading: false,
          ...notificationSettings,
        });
      }

      setOpen(true);
    } catch (error) {
      if (error instanceof ApiError) {
        if (toastRef.current) {
          toast.update(toastRef.current, {
            render: !error.message
              ? 'Failed to retrieve recording'
              : `${error.errorCode}: ${error.message}`,
            type: toast.TYPE.ERROR,
            isLoading: false,
            ...notificationSettings,
          });
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (toastRef.current) {
          toast.update(toastRef.current, {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            render: error.message || 'Failed to retrieve recording',
            type: toast.TYPE.ERROR,
            isLoading: false,
            ...notificationSettings,
          });
        }
      }
    }
  };

  const copyLink = () => {
    copy(url);
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
            Name: {meeting.name}
          </Typography>

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
              End Time:
              <Typography variant='body2'>
                {dateTimeEnd.format('HH:mm')}
              </Typography>
            </Typography>
          </Stack>
          <Button
            variant='outlined'
            onClick={handleRequestRecording}
            sx={{ width: 'max-content' }}
          >
            Get Recording
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle>Copy Recording Link</DialogTitle>
            <DialogContent>
              <Stack direction='row' spacing={2}>
                <TextField
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  name='recordingLink'
                  defaultValue={url || 'No recording available'}
                  InputLabelProps={{ shrink: false }}
                />
                <Tooltip title='Copy to Clipboard'>
                  <IconButton size='small' color='primary' onClick={copyLink}>
                    <ContentPasteGoIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RecordingsMeetingsCard;
