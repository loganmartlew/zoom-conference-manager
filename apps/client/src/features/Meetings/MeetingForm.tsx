import { FC } from 'react';
import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { formats } from '@zoom-conference-manager/dates';
import { FieldError, SubmitHandler } from 'react-hook-form';
import { Button, Stack, MenuItem, styled } from '@mui/material';
import dayjs from 'dayjs';
import TextInput from '../../components/forms/TextInput';
import Select from '../../components/forms/Select';
import DatetimePicker from '../../components/forms/DatetimePicker';
import { IFormInput, useMeetingForm } from './useMeetingForm';

const Form = styled('form')({});

const MeetingInput: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    eventNames,
  } = useMeetingForm();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const meetingData: MeetingDTO = {
      ...data,
      startDateTime: dayjs(data.startDateTime).format(formats.dateTime),
    };

    console.log(meetingData);
  };

  return (
    <Form
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: {
          xs: '100%',
          sm: 400,
        },
      }}
    >
      <Stack spacing={2}>
        <TextInput
          name='ubid'
          label='UBID'
          control={control}
          error={errors.ubid}
        />
        <TextInput
          name='name'
          label='Name'
          control={control}
          error={errors.name}
        />
        <DatetimePicker
          name='startDateTime'
          label='Meeting Date and Time'
          control={control}
          error={errors.startDateTime as FieldError | void}
        />
        <TextInput
          name='duration'
          label='Meeting Duration (minutes)'
          control={control}
          error={errors.duration}
        />
        <Select
          name='eventId'
          label='Event'
          control={control}
          error={errors.eventId}
          helperText={errors.eventId?.message}
        >
          <MenuItem value='' disabled>
            Select an event...
          </MenuItem>
          {eventNames &&
            eventNames.map((event) => (
              <MenuItem value={event.id} key={event.id}>
                {event.name}
              </MenuItem>
            ))}
        </Select>
        <Button type='submit' variant='contained'>
          Submit Meeting
        </Button>
      </Stack>
    </Form>
  );
};

export default MeetingInput;
