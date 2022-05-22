import { FC } from 'react';
import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { FieldError, SubmitHandler } from 'react-hook-form';
import { Button, Stack, MenuItem, styled } from '@mui/material';
import dayjs from 'dayjs';
import TextInput from '../../components/forms/TextInput';
import TextArea from '../../components/forms/TextArea';
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
      meetingDate: dayjs(data.meetingDate).format('YYYY-MM-DD HH:mm:ss'),
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
        <Select
          name='event'
          label='Event'
          control={control}
          error={errors.event}
          helperText={errors.event?.message}
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
        <TextInput
          name='name'
          label='Name'
          control={control}
          error={errors.name}
        />
        <TextArea
          name='description'
          label='Description'
          control={control}
          error={errors.description}
          minRows={3}
        />
        <DatetimePicker
          name='meetingDate'
          label='Meeting Date and Time'
          control={control}
          error={errors.meetingDate as FieldError | void}
        />
        <TextInput
          name='meetingDuration'
          label='Meeting Duration (minutes)'
          control={control}
          error={errors.meetingDuration}
        />
        <Button type='submit' variant='contained'>
          Submit Meeting
        </Button>
      </Stack>
    </Form>
  );
};

export default MeetingInput;
