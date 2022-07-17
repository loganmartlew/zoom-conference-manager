import { FC, ChangeEvent, useReducer, useState } from 'react';
import { Stack, Button, Alert } from '@mui/material';
import UpdateMeetingField from './UpdateMeetingField';
import {
  Meeting,
  UpdateState,
  UpdateMeetingType,
  UpdateAction,
} from './MeetingTypes/UpdateMeetingTypes';

interface Props {
  getMeeting: (id: number) => Meeting;
  meetingID: number;
  editOnRender: boolean;
}

// TODO: update the alert so that it shows success, and only displays the error version when
// an error is thrown
const updateMeetingReducer = (state: UpdateState, action: UpdateAction) => {
  switch (action.type) {
    case UpdateMeetingType.SET:
      return {
        ...state,
        value: { ...state.value, [action.name]: action.payload },
      };
    case UpdateMeetingType.EDIT: {
      let updatedEdit;
      if (action.payload === 'false') {
        updatedEdit = true;
      } else if (action.payload === 'true') {
        updatedEdit = false;
      }

      return {
        ...state,
        edit: {
          ...state.edit,
          [action.name]: updatedEdit,
        },
      };
    }
    case UpdateMeetingType.ERR:
      return {
        ...state,
        error: { ...state.error, [action.name]: action.payload },
      };
    default:
      return { ...state };
  }
};

const UpdateMeeting: FC<Props> = (props: Props) => {
  const { getMeeting, meetingID, editOnRender } = props;

  const [meetingState, meetingDispatch] = useReducer(updateMeetingReducer, {
    value: getMeeting(meetingID),
    edit: {
      name: editOnRender,
      date: editOnRender,
      duration: editOnRender,
      event: editOnRender,
      time: editOnRender,
    },
    error: {
      name: false,
      date: false,
      duration: false,
      event: false,
      time: false,
    },
  });

  const [updateMeetingAlert, setUpdateMeetingAlert] = useState(false);

  const validateDurationChange = (value: string): boolean => {
    const pattern = /[A-Za-z]/;

    // note is in base 10
    if (parseInt(value, 10) && value >= '0' && !pattern.test(value)) {
      // return at end
    } else {
      meetingDispatch({
        type: UpdateMeetingType.ERR,
        payload: 'false',
        name: 'duration',
      });
      return false;
    }
    meetingDispatch({
      type: UpdateMeetingType.ERR,
      payload: 'true',
      name: 'duration',
    });
    return true;
  };

  const validateTimeChange = (value: string): boolean => {
    // note input param is 10 in parseInt represents base 10
    if (parseInt(value, 10)) {
      if (
        value.length === 4 &&
        value.charAt(0) >= '0' &&
        value.charAt(0) <= '2'
      ) {
        // calls meetingDispatch and returns at end
      } else {
        meetingDispatch({
          type: UpdateMeetingType.ERR,
          payload: 'false',
          name: 'time',
        });
        return false;
      }
    }
    meetingDispatch({
      type: UpdateMeetingType.ERR,
      payload: 'true',
      name: 'time',
    });
    return true;
  };

  const validateDateChange = (value: string) => {
    const [day, month, year] = value.split('/');
    let isValid = false;

    const pattern = /[A-Za-z]/;

    if (pattern.test(day) || pattern.test(month) || pattern.test(year)) {
      // test fails, is valid is false so move on to dispatch and return
      // note that for parseInt the second parameter represents base 10
    } else if (parseInt(day, 10) && parseInt(month, 10) && parseInt(year, 10)) {
      const intDay = parseInt(day, 10);
      const intMonth = parseInt(month, 10);
      const intYear = parseInt(year, 10);

      // dont check for an upper limit on year since year theorically has no upperbound
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
      meetingDispatch({
        type: UpdateMeetingType.ERR,
        payload: 'false',
        name: 'date',
      });
      return false;
    }
    meetingDispatch({
      type: UpdateMeetingType.ERR,
      payload: 'true',
      name: 'date',
    });
    return true;
  };

  // method used as argument to UpdateMeetingField component in order
  // to dispatch allow for editing different fields.
  const editField = (fieldName: keyof Meeting, value: string) => {
    // note payload is blank is it is just toggling the current edit boolean value
    meetingDispatch({
      type: UpdateMeetingType.EDIT,
      payload: value,
      name: fieldName,
    });
  };

  return (
    <Stack direction='column' spacing='2rem'>
      <UpdateMeetingField
        value={meetingState.value.date}
        editField={() => {
          editField('date', meetingState.edit.date ? 'true' : 'false');
        }}
        isEditable={meetingState.edit.date}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          if (validateDateChange(value)) {
            meetingDispatch({
              type: UpdateMeetingType.SET,
              payload: value,
              name: 'date',
            });
          }
        }}
        name='date'
        error={meetingState.error.date}
        errorText='date format dd/mm/yyyy'
      />
      <UpdateMeetingField
        value={meetingState.value.time}
        editField={() => {
          editField('time', meetingState.edit.time ? 'true' : 'false');
        }}
        isEditable={meetingState.edit.time}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          if (validateTimeChange(value)) {
            meetingDispatch({
              type: UpdateMeetingType.SET,
              payload: value,
              name: 'time',
            });
          }
        }}
        name='time'
        error={meetingState.error.time}
        errorText='time format 0000 - 2400 where 2400 represents 24:00'
      />
      <UpdateMeetingField
        value={meetingState.value.name}
        editField={() => {
          editField('name', meetingState.edit.name ? 'true' : 'false');
        }}
        isEditable={meetingState.edit.name}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          meetingDispatch({
            type: UpdateMeetingType.SET,
            payload: value,
            name: 'name',
          });
        }}
        name='name'
        error={meetingState.error.name}
        errorText=''
        data-testid='update--meeting--name'
      />
      <UpdateMeetingField
        value={meetingState.value.duration}
        editField={() => {
          editField('duration', meetingState.edit.duration ? 'true' : 'false');
        }}
        isEditable={meetingState.edit.duration}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          if (validateDurationChange(value)) {
            meetingDispatch({
              type: UpdateMeetingType.SET,
              payload: value,
              name: 'duration',
            });
          }
        }}
        name='duration'
        error={meetingState.error.duration}
        errorText='duration must be a postive number'
      />
      <UpdateMeetingField
        value={meetingState.value.event}
        editField={() => {
          editField('event', meetingState.edit.event ? 'true' : 'false');
        }}
        isEditable={meetingState.edit.event}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          meetingDispatch({
            type: UpdateMeetingType.SET,
            payload: value,
            name: 'event',
          });
        }}
        name='event'
        error={meetingState.error.event}
        errorText=''
      />
      <Button
        onClick={() => {
          setUpdateMeetingAlert(!updateMeetingAlert);
        }}
        variant='contained'
        sx={{ width: '5rem' }}
      >
        Update
      </Button>

      {updateMeetingAlert && (
        <Alert
          onClose={() => {
            setUpdateMeetingAlert(false);
          }}
          severity='error'
        >
          Error updating meeting!
        </Alert>
      )}
    </Stack>
  );
};

export default UpdateMeeting;
