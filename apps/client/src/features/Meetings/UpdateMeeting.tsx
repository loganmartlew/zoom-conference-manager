import { FC, useState } from 'react';
import { Stack, Box, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// interface Props {
//   getMeeting: () => void;
//   meetingID: number;
// }

interface Edit {
  ubid: boolean;
  name: boolean;
  date: boolean;
  time: boolean;
  duration: boolean;
  event: boolean;
}

// need to take the meeting info, as well as id as input
const UpdateMeeting: FC = () => {
  // need to refactor to use an alternative hook for object
  const [ubid, setUbid] = useState('00000000');
  const [name, setName] = useState('Test');
  const [date, setDate] = useState('23/06/22');
  const [time, setTime] = useState('1400');
  const [duration, setDuration] = useState('1');
  const [event, setEvent] = useState('Hello');

  const [edit, setEdit] = useState<Edit>({
    ubid: false,
    name: false,
    date: false,
    duration: false,
    event: false,
    time: false,
  });

  const editField = (fieldName: string) => {
    switch (fieldName) {
      case 'ubid': {
        setEdit({ ...edit, [fieldName]: !edit[fieldName] });
        break;
      }
      case 'name': {
        setEdit({ ...edit, [fieldName]: !edit[fieldName] });
        break;
      }
      case 'time': {
        // check valid time on change?
        setEdit({ ...edit, [fieldName]: !edit[fieldName] });
        break;
      }
      case 'duration': {
        // check valid duration on change?
        setEdit({ ...edit, [fieldName]: !edit[fieldName] });
        break;
      }
      case 'date': {
        // check valid date on change perhaps?
        setEdit({ ...edit, [fieldName]: !edit[fieldName] });
        break;
      }
      case 'event': {
        setEdit({ ...edit, [fieldName]: !edit[fieldName] });
        break;
      }
      default:
        break;
    }
  };

  return (
    <Stack direction='column' spacing='2rem'>
      <Box>
        {edit.ubid ? (
          <TextField defaultValue={ubid} label='ubid' name='ubid' />
        ) : (
          <TextField disabled defaultValue={ubid} label='ubid' name='ubid' />
        )}
        <EditIcon
          color={edit.ubid ? 'primary' : 'secondary'}
          onClick={() => {
            editField('ubid');
          }}
        />
      </Box>
      <Box>
        {edit.date ? (
          <TextField defaultValue={date} label='date' name='date' />
        ) : (
          <TextField disabled defaultValue={date} label='date' name='date' />
        )}
        <EditIcon
          color={edit.date ? 'primary' : 'secondary'}
          onClick={() => {
            editField('date');
          }}
        />
      </Box>
      <Box>
        {edit.time ? (
          <TextField defaultValue={time} label='time' name='time' />
        ) : (
          <TextField disabled defaultValue={time} label='time' name='time' />
        )}
        <EditIcon
          color={edit.time ? 'primary' : 'secondary'}
          onClick={() => {
            editField('time');
          }}
        />
      </Box>
      <Box>
        {edit.name ? (
          <TextField defaultValue={name} label='name' name='name' />
        ) : (
          <TextField disabled defaultValue={name} label='name' name='name' />
        )}
        <EditIcon
          color={edit.name ? 'primary' : 'secondary'}
          onClick={() => {
            editField('name');
          }}
        />
      </Box>
      <Box>
        {edit.duration ? (
          <TextField defaultValue={duration} label='duration' name='duration' />
        ) : (
          <TextField
            disabled
            defaultValue={duration}
            label='duration'
            name='duration'
          />
        )}
        <EditIcon
          color={edit.duration ? 'primary' : 'secondary'}
          onClick={() => {
            editField('duration');
          }}
        />
      </Box>
      <Box>
        {edit.event ? (
          <TextField defaultValue={event} label='event' name='event' />
        ) : (
          <TextField disabled defaultValue={event} label='event' name='event' />
        )}
        <EditIcon
          color={edit.event ? 'primary' : 'secondary'}
          onClick={() => {
            editField('event');
          }}
        />
      </Box>
      <Button variant='contained' sx={{ width: '5rem' }}>
        Update
      </Button>
    </Stack>
  );
};

export default UpdateMeeting;
