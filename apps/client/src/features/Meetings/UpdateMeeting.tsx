import { FC, useState, ChangeEvent } from 'react';
import { Stack, Button } from '@mui/material';
import UpdateMeetingField from './UpdateMeetingField';
import UpdateMeetingState from './MeetingTypes/UpdateMeetingState';

interface Props {
  getMeeting: (id: number) => UpdateMeetingState;
  meetingID: number;
}

interface Edit {
  ubid: boolean;
  name: boolean;
  date: boolean;
  time: boolean;
  duration: boolean;
  event: boolean;
}

const UpdateMeeting: FC<Props> = (props: Props) => {
  const { getMeeting, meetingID } = props;
  const initialState = getMeeting(meetingID);

  // need to use, useReducer for more modularity (refacotor)
  const [ubid, setUbid] = useState(initialState.ubid);
  const [name, setName] = useState(initialState.name);
  const [date, setDate] = useState(initialState.date);
  const [time, setTime] = useState(initialState.time);
  const [duration, setDuration] = useState(initialState.duration);
  const [event, setEvent] = useState(initialState.event);

  const [edit, setEdit] = useState<Edit>({
    ubid: false,
    name: false,
    date: false,
    duration: false,
    event: false,
    time: false,
  });

  const [error, setError] = useState<Edit>({
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

    const pattern = /[A-Za-z]/;

    // note is in base 10
    if (parseInt(value, 10) && value >= '0' && !pattern.test(value)) {
      setDuration(value);
    } else {
      setError({ ...error, duration: true });
      return;
    }
    setError({ ...error, duration: false });
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
        setError({ ...error, time: true });
        return;
      }
    }
    setError({ ...error, time: false });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const [day, month, year] = value.split('/');
    let isValid = false;
    console.log(year);

    const pattern = /[A-Za-z]/;

    if (pattern.test(day) || pattern.test(month) || pattern.test(year)) {
      // do nothing
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
      setError({ ...error, date: true });
      return;
    }
    setError({ ...error, date: false });
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
        setEdit({ ...edit, [fieldName]: !edit[fieldName] });
        break;
      }
      case 'duration': {
        setEdit({ ...edit, [fieldName]: !edit[fieldName] });
        break;
      }
      case 'date': {
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
        error={error.ubid}
        errorText=''
      />
      <UpdateMeetingField
        value={date}
        editField={editField}
        isEditable={edit.date}
        handleChange={handleDateChange}
        name='date'
        error={error.date}
        errorText='date format dd/mm/yyyy'
      />
      <UpdateMeetingField
        value={time}
        editField={editField}
        isEditable={edit.time}
        handleChange={handleTimeChange}
        name='time'
        error={error.time}
        errorText='time format 0000 - 2400 where 2400 represents 24:00'
      />
      <UpdateMeetingField
        value={name}
        editField={editField}
        isEditable={edit.name}
        handleChange={handleChange}
        name='name'
        error={error.name}
        errorText=''
      />
      <UpdateMeetingField
        value={duration}
        editField={editField}
        isEditable={edit.duration}
        handleChange={handleDurationChange}
        name='duration'
        error={error.duration}
        errorText='duration must be a postive number'
      />
      <UpdateMeetingField
        value={event}
        editField={editField}
        isEditable={edit.event}
        handleChange={handleChange}
        name='event'
        error={error.event}
        errorText=''
      />
      <Button variant='contained' sx={{ width: '5rem' }}>
        Update
      </Button>
    </Stack>
  );
};

export default UpdateMeeting;
