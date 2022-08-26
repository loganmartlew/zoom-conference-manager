import { FC } from 'react';
import { styled, Stack } from '@mui/material';
import TextInput from '../../components/forms/TextInput';

const Form = styled('form')({});

const RehearsalsForm: FC = () => {
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
        <TextInput name='name' label='Name' autoFocus />
      </Stack>
    </Form>
  );
};

export default RehearsalsForm;
