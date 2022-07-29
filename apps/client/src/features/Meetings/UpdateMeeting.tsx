import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { FC, ChangeEvent, useReducer, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Stack, Button, Alert } from '@mui/material';
import UpdateMeetingField from './UpdateMeetingField';
import {
  Meeting,
  UpdateState,
  UpdateMeetingType,
  UpdateAction,
} from './MeetingTypes/UpdateMeetingTypes';

// TODO: check with team that error handeling can be done on the backend,
// and just helper text on backend is fine.

interface Props {
  getMeetingData: (ubid: string) => Promise<MeetingDTO>;
  updateMeetingData: (
    ubid: string,
    meetingData: MeetingDTO
  ) => Promise<MeetingDTO>;
  ubid: string;
  eventId: string;
  editOnRender: boolean;
}

const updateMeetingReducer = (state: UpdateState, action: UpdateAction) => {
  if (action.type === UpdateMeetingType.INITIALIZE && action.name === null) {
    const [duration, eventId, startDateTime, name] = action.payload.split(',');
    const date = dayjs(startDateTime).format('DD/MM/YYYY');
    const time = dayjs(startDateTime).format('HHmm');
    return {
      ...state,
      value: { ...state.value, duration, name, date, time, event: eventId },
    };
    // eslint-disable-next-line no-else-return
  } else if (action.name === null) {
    const [duration, eventId, date, name] = action.payload.split(',');
    return { ...state, name, date, duration, event: eventId, time: '' };
  }

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
    case UpdateMeetingType.ERR: {
      console.log(`Err_date_reducer: ${state.error.date}`);
      let updatedErr;
      if (action.payload === 'true') {
        updatedErr = true;
      } else {
        updatedErr = false;
      }

      return {
        ...state,
        error: { ...state.error, [action.name]: updatedErr },
      };
    }
    default:
      return { ...state };
  }
};

const UpdateMeeting: FC<Props> = (props: Props) => {
  const { ubid, eventId, editOnRender, getMeetingData, updateMeetingData } =
    props;

  const [meetingState, meetingDispatch] = useReducer(updateMeetingReducer, {
    value: {
      name: '',
      date: '',
      duration: '',
      event: '',
      time: '',
    },
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

  const [updateMeetingAlert, setUpdateMeetingAlert] = useState({
    active: false,
    alertText: '',
  });

  const getMeetingInfo = async () => {
    try {
      const data = await getMeetingData(ubid);
      meetingDispatch({
        type: UpdateMeetingType.INITIALIZE,
        payload: `${data.duration},${eventId},${data.startDateTime},${data.name}`,
        name: null,
      });
    } catch (e) {
      console.log(e);
      setUpdateMeetingAlert({
        active: true,
        alertText: 'Error Fetching Meeting Information',
      });
    }
  };

  const sendMeetingUpdate = async (
    meetingUbid: string,
    meetingData: MeetingDTO
  ) => {
    try {
      await updateMeetingData(meetingUbid, meetingData);
    } catch (e) {
      console.log(e);
      setUpdateMeetingAlert({
        active: true,
        alertText: 'Error Updating Meeting',
      });
    }
  };

  useEffect(() => {
    getMeetingInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateDurationChange = (value: string) => {
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
    }
    meetingDispatch({
      type: UpdateMeetingType.ERR,
      payload: 'true',
      name: 'duration',
    });
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
    }
    meetingDispatch({
      type: UpdateMeetingType.ERR,
      payload: 'true',
      name: 'date',
    });
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
          validateDateChange(value);
          meetingDispatch({
            type: UpdateMeetingType.SET,
            payload: value,
            name: 'date',
          });
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
          validateTimeChange(value);
          meetingDispatch({
            type: UpdateMeetingType.SET,
            payload: value,
            name: 'time',
          });
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
          validateDurationChange(value);
          meetingDispatch({
            type: UpdateMeetingType.SET,
            payload: value,
            name: 'duration',
          });
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
          // note this date format is required for backend processing
          const [day, month, year] = meetingState.value.date.split('/');
          const hours = meetingState.value.time.substring(0, 2);
          const mins = meetingState.value.time.substring(2);
          const secs = '00'; // the start time doesn't require a specific second to start
          sendMeetingUpdate(ubid, {
            ubid,
            name: meetingState.value.name,
            startDateTime: `${year}-${month}-${day} ${hours}:${mins}:${secs}`,
            duration: parseFloat(meetingState.value.duration),
            eventId,
          });
        }}
        variant='contained'
        sx={{ width: '5rem' }}
      >
        Update
      </Button>

      {updateMeetingAlert.active && (
        <Alert
          onClose={() => {
            setUpdateMeetingAlert({ ...updateMeetingAlert, active: false });
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
