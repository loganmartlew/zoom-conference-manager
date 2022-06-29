import { FC, useState, ChangeEvent } from 'react';
import { Stack, Box, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UpdateMeetingField from './UpdateMeetingField';
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: targetName, value } = e.target;

    switch (targetName) {
      case 'ubid': {
        setUbid(value);
        break;
      }
      case 'name': {
        setName(value);
        break;
      }
      case 'event': {
        setEvent(value);
        break;
      }
      default:
        break;
    }
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // note is in base 10
    if (parseInt(value, 10) && value >= '0') {
      setDuration(value);
    } else {
      // do something to tell them they are wrong
      console.log('incorrect input');
    }
    console.log(duration);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // note is in base 10
    if (parseInt(value, 10)) {
      if (
        value.length === 4 &&
        value.charAt(0) >= '0' &&
        value.charAt(0) <= '2'
      ) {
        setTime(value);
      } else {
        console.log('something went wrong with time input');
      }
    }
    console.log(time);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const [day, month, year] = value.split('/');
    let isValid = false;
    console.log(year);

    const pattern = /[A-Za-z]/;

    if (pattern.test(day) || pattern.test(month) || pattern.test(year)) {
      // display error
    } else if (parseInt(day, 10) && parseInt(month, 10) && parseInt(year, 10)) {
      const intDay = parseInt(day, 10);
      const intMonth = parseInt(month, 10);
      const intYear = parseInt(year, 10);

      console.log(intYear);
      // dont check for an upper limit on year since year theorically have an upperbound
      if (
        intDay >= 1 &&
        intDay <= 31 &&
        intMonth >= 1 &&
        intMonth <= 12 &&
        intYear >= 1
      ) {
        setDate(value);
        isValid = true;
      }
    }

    if (!isValid) {
      // display an error msg?
      console.log('error in date input');
    }
    console.log(date);
  };

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
      <UpdateMeetingField
        value={ubid}
        editField={editField}
        isEditable={edit.ubid}
        handleChange={handleChange}
        name='ubid'
      />
      <UpdateMeetingField
        value={date}
        editField={editField}
        isEditable={edit.date}
        handleChange={handleDateChange}
        name='date'
      />
      <UpdateMeetingField
        value={time}
        editField={editField}
        isEditable={edit.time}
        handleChange={handleTimeChange}
        name='time'
      />
      <UpdateMeetingField
        value={name}
        editField={editField}
        isEditable={edit.name}
        handleChange={handleChange}
        name='name'
      />
      <UpdateMeetingField
        value={duration}
        editField={editField}
        isEditable={edit.duration}
        handleChange={handleDurationChange}
        name='duration'
      />
      <UpdateMeetingField
        value={event}
        editField={editField}
        isEditable={edit.duration}
        handleChange={handleChange}
        name='event'
      />
      <Button variant='contained' sx={{ width: '5rem' }}>
        Update
      </Button>
    </Stack>
  );
};

export default UpdateMeeting;
