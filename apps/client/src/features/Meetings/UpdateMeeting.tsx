import { FC, ChangeEvent, useReducer, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Stack, Button, Alert } from '@mui/material';
import UpdateMeetingField from './UpdateMeetingField';
import {
  Meeting,
  MeetingData,
  UpdateState,
  UpdateMeetingType,
  UpdateAction,
} from './MeetingTypes/UpdateMeetingTypes';

interface Props {
  meetingData: MeetingData;
  updateMeetingData: (
    id: string,
    meetingData: MeetingData
  ) => Promise<MeetingData>;
  meetingId: string;
  editOnRender: boolean;
}

const updateMeetingReducer = (state: UpdateState, action: UpdateAction) => {
  if (action.type === UpdateMeetingType.INITIALIZE && action.name === null) {
    const [duration, startDateTime, name] = action.payload.split(',');
    const date = dayjs(startDateTime).format('DD/MM/YYYY');
    const time = dayjs(startDateTime).format('HHmm');
    return {
      ...state,
      value: { ...state.value, duration, name, date, time },
    };
    // eslint-disable-next-line no-else-return
  } else if (action.name === null) {
    const [duration, date, name] = action.payload.split(',');
    return { ...state, name, date, duration, time: '' };
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
    default:
      return { ...state };
  }
};

const UpdateMeeting: FC<Props> = (props: Props) => {
  const { meetingId, editOnRender, meetingData, updateMeetingData } = props;

  const formatDateTime = () => {
    return meetingData.startDateTime.split(' ');
  };

  const [meetingState, meetingDispatch] = useReducer(updateMeetingReducer, {
    value: {
      name: meetingData.name,
      date: formatDateTime()[0],
      duration: meetingData.duration.toString(),
      time: formatDateTime()[1],
    },
    edit: {
      name: editOnRender,
      date: editOnRender,
      duration: editOnRender,
      time: editOnRender,
    },
  });

  const [updateMeetingAlert, setUpdateMeetingAlert] = useState({
    active: false,
    alertText: '',
  });

  const sendMeetingUpdate = async (
    meetingUbid: string,
    meetingDataToSend: MeetingData
  ) => {
    try {
      await updateMeetingData(meetingUbid, meetingDataToSend);
    } catch (e) {
      setUpdateMeetingAlert({
        active: true,
        alertText: 'Error Updating Meeting',
      });
    }
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
          meetingDispatch({
            type: UpdateMeetingType.SET,
            payload: value,
            name: 'date',
          });
        }}
        name='date'
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
          meetingDispatch({
            type: UpdateMeetingType.SET,
            payload: value,
            name: 'time',
          });
        }}
        name='time'
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
          meetingDispatch({
            type: UpdateMeetingType.SET,
            payload: value,
            name: 'duration',
          });
        }}
        name='duration'
        errorText='duration must be a postive number'
      />
      <Button
        onClick={() => {
          // note this date format is required for backend processing
          const [day, month, year] = meetingState.value.date.split('/');
          const hours = meetingState.value.time.substring(0, 2);
          const mins = meetingState.value.time.substring(2);
          const secs = '00'; // the start time doesn't require a specific second to start
          sendMeetingUpdate(meetingId, {
            id: meetingId,
            name: meetingState.value.name,
            startDateTime: `${year}-${month}-${day} ${hours}:${mins}:${secs}`,
            duration: parseFloat(meetingState.value.duration),
          });

          // reset all of the fields to disabled (require to click edit, in order to edit again)
          const fieldNames: Array<keyof Meeting> = [
            'date',
            'time',
            'name',
            'duration',
            'event',
          ];
          fieldNames.forEach((name) => {
            meetingDispatch({
              type: UpdateMeetingType.EDIT,
              payload: 'true',
              name,
            });
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
          {updateMeetingAlert.alertText}
        </Alert>
      )}
    </Stack>
  );
};

export default UpdateMeeting;
