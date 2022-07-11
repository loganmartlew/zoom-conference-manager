import { FC, ChangeEvent, useReducer } from 'react';
import { Stack, Button } from '@mui/material';
import UpdateMeetingField from './UpdateMeetingField';
import UpdateMeetingState from './MeetingTypes/UpdateMeetingState';
import {
  UpdateState,
  UpdateMeetingType,
  UpdateAction,
} from './MeetingTypes/UpdateMeetingTypes';

interface Props {
  getMeeting: (id: number) => UpdateMeetingState;
  meetingID: number;
}

const updateMeetingReducer = (state: UpdateState, action: UpdateAction) => {
  switch (action.type) {
    case UpdateMeetingType.SET_UBID:
      return { ...state, value: { ...state.value, ubid: action.payload } };
    case UpdateMeetingType.SET_NAME:
      return { ...state, value: { ...state.value, name: action.payload } };
    case UpdateMeetingType.SET_DATE:
      return { ...state, value: { ...state.value, date: action.payload } };
    case UpdateMeetingType.SET_TIME:
      return { ...state, value: { ...state.value, time: action.payload } };
    case UpdateMeetingType.SET_DURATION:
      return { ...state, value: { ...state.value, duration: action.payload } };
    case UpdateMeetingType.SET_EVENT:
      return { ...state, value: { ...state.value, event: action.payload } };
    case UpdateMeetingType.EDIT_UBID:
      return { ...state, edit: { ...state.edit, ubid: !state.edit.ubid } };
    case UpdateMeetingType.EDIT_NAME:
      return { ...state, edit: { ...state.edit, name: !state.edit.name } };
    case UpdateMeetingType.EDIT_DATE:
      return { ...state, edit: { ...state.edit, date: !state.edit.date } };
    case UpdateMeetingType.EDIT_TIME:
      return { ...state, edit: { ...state.edit, time: !state.edit.time } };
    case UpdateMeetingType.EDIT_DURATION:
      return {
        ...state,
        edit: { ...state.edit, duration: !state.edit.duration },
      };
    case UpdateMeetingType.EDIT_EVENT:
      return { ...state, edit: { ...state.edit, event: !state.edit.event } };
    case UpdateMeetingType.ERR_UBID: {
      if (action.payload === 'true') {
        return { ...state, error: { ...state.error, ubid: false } };
      }
      return { ...state, error: { ...state.error, ubid: true } };
    }
    case UpdateMeetingType.ERR_NAME: {
      if (action.payload === 'true') {
        return { ...state, error: { ...state.error, name: false } };
      }
      return { ...state, error: { ...state.error, name: true } };
    }
    case UpdateMeetingType.ERR_DATE: {
      console.log(state.error.date);
      if (action.payload === 'true') {
        return { ...state, error: { ...state.error, date: false } };
      }
      return { ...state, error: { ...state.error, date: true } };
    }
    case UpdateMeetingType.ERR_TIME: {
      if (action.payload === 'true') {
        return { ...state, error: { ...state.error, time: false } };
      }
      return { ...state, error: { ...state.error, time: true } };
    }
    case UpdateMeetingType.ERR_DURATION: {
      if (action.payload === 'true') {
        return { ...state, error: { ...state.error, duration: false } };
      }
      return { ...state, error: { ...state.error, duration: true } };
    }
    case UpdateMeetingType.ERR_EVENT: {
      if (action.payload === 'true') {
        return { ...state, error: { ...state.error, event: false } };
      }
      return { ...state, error: { ...state.error, event: true } };
    }
    default:
      return { ...state };
  }
};

const UpdateMeeting: FC<Props> = (props: Props) => {
  const { getMeeting, meetingID } = props;

  const [meetingState, meetingDispatch] = useReducer(updateMeetingReducer, {
    value: getMeeting(meetingID),
    edit: {
      ubid: false,
      name: false,
      date: false,
      duration: false,
      event: false,
      time: false,
    },
    error: {
      ubid: false,
      name: false,
      date: false,
      duration: false,
      event: false,
      time: false,
    },
  });

  const validateDurationChange = (value: string): boolean => {
    const pattern = /[A-Za-z]/;

    // note is in base 10
    if (parseInt(value, 10) && value >= '0' && !pattern.test(value)) {
      // return at end
    } else {
      meetingDispatch({
        type: UpdateMeetingType.ERR_DURATION,
        payload: 'false',
      });
      return false;
    }
    meetingDispatch({ type: UpdateMeetingType.ERR_DURATION, payload: 'true' });
    return true;
  };

  const validateTimeChange = (value: string): boolean => {
    // note is in base 10
    if (parseInt(value, 10)) {
      if (
        value.length === 4 &&
        value.charAt(0) >= '0' &&
        value.charAt(0) <= '2'
      ) {
        // return at end
      } else {
        meetingDispatch({ type: UpdateMeetingType.ERR_TIME, payload: 'false' });
        return false;
      }
    }
    meetingDispatch({ type: UpdateMeetingType.ERR_TIME, payload: 'true' });
    return true;
  };

  const validateDateChange = (value: string) => {
    const [day, month, year] = value.split('/');
    let isValid = false;

    const pattern = /[A-Za-z]/;

    if (pattern.test(day) || pattern.test(month) || pattern.test(year)) {
      // do nothing
    } else if (parseInt(day, 10) && parseInt(month, 10) && parseInt(year, 10)) {
      const intDay = parseInt(day, 10);
      const intMonth = parseInt(month, 10);
      const intYear = parseInt(year, 10);

      // dont check for an upper limit on year since year theorically have an upperbound
      if (
        intDay >= 1 &&
        intDay <= 31 &&
        intMonth >= 1 &&
        intMonth <= 12 &&
        intYear >= 1
      ) {
        isValid = true;
      }
    }

    if (!isValid) {
      meetingDispatch({ type: UpdateMeetingType.ERR_DATE, payload: 'false' });
      return false;
    }
    meetingDispatch({ type: UpdateMeetingType.ERR_DATE, payload: 'true' });
    return true;
  };

  const editField = (fieldName: string) => {
    switch (fieldName) {
      case 'ubid': {
        meetingDispatch({ type: UpdateMeetingType.EDIT_UBID, payload: 'ubid' });
        break;
      }
      case 'name': {
        meetingDispatch({ type: UpdateMeetingType.EDIT_NAME, payload: 'name' });
        break;
      }
      case 'time': {
        meetingDispatch({ type: UpdateMeetingType.EDIT_TIME, payload: 'time' });
        break;
      }
      case 'duration': {
        meetingDispatch({
          type: UpdateMeetingType.EDIT_DURATION,
          payload: 'duration',
        });
        break;
      }
      case 'date': {
        meetingDispatch({ type: UpdateMeetingType.EDIT_DATE, payload: 'date' });
        break;
      }
      case 'event': {
        meetingDispatch({
          type: UpdateMeetingType.EDIT_EVENT,
          payload: 'event',
        });
        break;
      }
      default:
        break;
    }
  };

  return (
    <Stack direction='column' spacing='2rem'>
      <UpdateMeetingField
        value={meetingState.value.ubid}
        editField={editField}
        isEditable={meetingState.edit.ubid}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          meetingDispatch({ type: UpdateMeetingType.SET_UBID, payload: value });
        }}
        name='ubid'
        error={meetingState.error.ubid}
        errorText=''
      />
      <UpdateMeetingField
        value={meetingState.value.date}
        editField={editField}
        isEditable={meetingState.edit.date}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          if (validateDateChange(value)) {
            meetingDispatch({
              type: UpdateMeetingType.SET_DATE,
              payload: value,
            });
          }
        }}
        name='date'
        error={meetingState.error.date}
        errorText='date format dd/mm/yyyy'
      />
      <UpdateMeetingField
        value={meetingState.value.time}
        editField={editField}
        isEditable={meetingState.edit.time}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          if (validateTimeChange(value)) {
            meetingDispatch({
              type: UpdateMeetingType.SET_TIME,
              payload: value,
            });
          }
        }}
        name='time'
        error={meetingState.error.time}
        errorText='time format 0000 - 2400 where 2400 represents 24:00'
      />
      <UpdateMeetingField
        value={meetingState.value.name}
        editField={editField}
        isEditable={meetingState.edit.name}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          meetingDispatch({ type: UpdateMeetingType.SET_NAME, payload: value });
        }}
        name='name'
        error={meetingState.error.name}
        errorText=''
      />
      <UpdateMeetingField
        value={meetingState.value.duration}
        editField={editField}
        isEditable={meetingState.edit.duration}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          if (validateDurationChange(value)) {
            meetingDispatch({
              type: UpdateMeetingType.SET_DURATION,
              payload: value,
            });
          }
        }}
        name='duration'
        error={meetingState.error.duration}
        errorText='duration must be a postive number'
      />
      <UpdateMeetingField
        value={meetingState.value.event}
        editField={editField}
        isEditable={meetingState.edit.event}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          meetingDispatch({
            type: UpdateMeetingType.SET_EVENT,
            payload: value,
          });
        }}
        name='event'
        error={meetingState.error.event}
        errorText=''
      />
      <Button variant='contained' sx={{ width: '5rem' }}>
        Update
      </Button>
    </Stack>
  );
};

export default UpdateMeeting;
