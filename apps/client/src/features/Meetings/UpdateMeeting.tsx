import { FC, ChangeEvent, useReducer, useState } from 'react';
import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
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
  ) => Promise<MeetingDTO>;
  meetingId: string;
  editOnRender: boolean;
}

const updateMeetingReducer = (state: UpdateState, action: UpdateAction) => {
  if (action.type === UpdateMeetingType.INITIALIZE && action.name === null) {
    const [endDateTime, startDateTime, name] = action.payload.split(',');
    const date = dayjs(startDateTime).format('DD/MM/YYYY');
    const time = dayjs(startDateTime).format('HHmm');
    return {
      ...state,
      value: { ...state.value, endDateTime, name, date, time },
    };
    // eslint-disable-next-line no-else-return
  } else if (action.name === null) {
    const [endDateTime, date, name] = action.payload.split(',');
    return { ...state, name, date, endDateTime, time: '' };
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
      endTime: dayjs(meetingData.endDateTime).format('HHmm'),
      startTime: formatDateTime()[1],
    },
    edit: {
      name: editOnRender,
      date: editOnRender,
      endTime: editOnRender,
      startTime: editOnRender,
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
        alertText: 'Error Updating Meeting Please Review Your Inputs!',
      });
    }
  };

  /**
   * method used as argument to UpdateMeetingField component in order
   * to dispatch allow for editing different fields.
   * @param fieldName
   * @param value
   */
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
        displayName='Date'
        helperText='Date format dd/mm/yyyy'
      />
      <UpdateMeetingField
        value={meetingState.value.startTime}
        editField={() => {
          editField(
            'startTime',
            meetingState.edit.startTime ? 'true' : 'false'
          );
        }}
        isEditable={meetingState.edit.startTime}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          meetingDispatch({
            type: UpdateMeetingType.SET,
            payload: value,
            name: 'startTime',
          });
        }}
        name='startTime'
        displayName='Start Time'
        helperText='Time format 0000 - 2400 where 2400 represents 24:00'
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
        displayName='Name'
        helperText=''
        data-testid='update--meeting--name'
      />
      <UpdateMeetingField
        value={meetingState.value.endTime}
        editField={() => {
          editField('endTime', meetingState.edit.endTime ? 'true' : 'false');
        }}
        isEditable={meetingState.edit.endTime}
        handleChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          meetingDispatch({
            type: UpdateMeetingType.SET,
            payload: value,
            name: 'endTime',
          });
        }}
        name='endTime'
        displayName='End Time'
        helperText='Time format 0000 - 2400 where 2400 represents 24:00'
      />
      <Button
        onClick={() => {
          function convertToDateToFormat(date: string) {
            const [day, month, year] = date.split('/');
            return `${month}/${day}/${year}`;
          }

          const startDateFormatted = new Date(
            convertToDateToFormat(meetingState.value.date)
          );

          console.log(startDateFormatted);

          const hoursStart = parseInt(
            meetingState.value.startTime.substring(0, 2),
            10
          );
          const minsStart = parseInt(
            meetingState.value.startTime.substring(2),
            10
          );
          startDateFormatted.setHours(hoursStart);
          startDateFormatted.setMinutes(minsStart);

          const endDateFormatted = new Date(
            convertToDateToFormat(meetingState.value.date)
          );
          const hoursEnd = parseInt(
            meetingState.value.endTime.substring(0, 2),
            10
          );
          const minsEnd = parseInt(meetingState.value.endTime.substring(2), 10);
          endDateFormatted.setHours(hoursEnd);
          endDateFormatted.setMinutes(minsEnd);

          const startDateTimeToSend = dayjs(startDateFormatted);
          const endDateTimeToSend = dayjs(endDateFormatted);

          if (startDateTimeToSend.isAfter(endDateTimeToSend)) {
            endDateTimeToSend.add(1, 'day');
          }

          console.log(dayjs(startDateTimeToSend).format('YYYY-DD-MM HH:mm:ss'));

          sendMeetingUpdate(meetingId, {
            id: meetingId,
            name: meetingState.value.name,
            startDateTime: dayjs(startDateTimeToSend).format(
              'YYYY-MM-DD HH:mm:ss'
            ),
            endDateTime: dayjs(endDateTimeToSend).format('YYYY-MM-DD HH:mm:ss'),
          });

          // reset all of the fields to disabled (require to click edit, in order to edit again)
          const fieldNames: Array<keyof Meeting> = [
            'date',
            'startTime',
            'name',
            'endTime',
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
