import { FC } from 'react';
import { styled, Stack, Button } from '@mui/material';
import { FieldError } from 'react-hook-form';
import TextInput from '../../components/forms/TextInput';
import { useRehearsalsForm } from './useRehearsalsForm';
import DatePicker from '../../components/forms/DatePicker';
import TimePicker from '../../components/forms/TimePicker';

const Form = styled('form')({});

const RehearsalsForm: FC = () => {
  const {
    control,
    // handleSubmit,
    formState: { errors },
  } = useRehearsalsForm();

  return (
    <Form
      autoComplete='off'
      sx={{
        width: {
          xs: '100%',
          sm: 400,
        },
      }}
    >
      <Stack spacing={2}>
        <TextInput
          name='name'
          label='Name'
          control={control}
          error={errors.name}
          autoFocus
        />
        <DatePicker
          name='startDate'
          label='Date'
          control={control}
          error={errors.startDate as FieldError | void}
        />
        <TimePicker
          name='startTime'
          label='Start Time'
          control={control}
          error={errors.startTime}
        />
        <TimePicker
          name='endTime'
          label='End Time'
          control={control}
          error={errors.endTime}
        />
        <TextInput
          name='presenter'
          label='Presenter'
          control={control}
          error={errors.presenter}
        />
        <TextInput
          name='presEmail'
          label='Presenter Email'
          control={control}
          error={errors.presEmail}
        />
        <TextInput
          name='rehearsalId'
          label='Rehearsal ID'
          control={control}
          error={errors.rehearsalId}
        />
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </Stack>
    </Form>
  );
};

export default RehearsalsForm;
