import { FC } from 'react';
import { styled, Stack } from '@mui/material';
import { FieldError } from 'react-hook-form';
import TextInput from '../../components/forms/TextInput';
import { useRehearsalsForm } from './useRehearsalsForm';
import DatePicker from '../../components/forms/DatePicker';

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
      </Stack>
    </Form>
  );
};

export default RehearsalsForm;
