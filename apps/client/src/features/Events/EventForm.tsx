import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventDTO } from '@zoom-conference-manager/api-interfaces';
import { FieldError, SubmitHandler } from 'react-hook-form';
import { Button, CircularProgress, Stack, styled } from '@mui/material';
import dayjs from 'dayjs';
import TextInput from '../../components/forms/TextInput';
import TextArea from '../../components/forms/TextArea';
import DatePicker from '../../components/forms/DatePicker';
import { usePostEvent } from './api/postEvent';
import { IFormInput, useEventForm } from './useEventForm';

const Form = styled('form')({});

const EventForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useEventForm();

  const navigate = useNavigate();

  const onPostSuccess = () => {
    // Notification, event added
    navigate('/events');
  };

  const onPostError = (error: unknown, variables: EventDTO) => {
    // Notification, error
    console.log('An error occurred');
    console.log('Error: ', error);
    console.log('Data: ', variables);
  };

  const { mutate, isLoading } = usePostEvent(onPostSuccess, onPostError);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const eventData: EventDTO = {
      ...data,
      startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
    };

    mutate(eventData);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
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
          name='ubid'
          label='UBID'
          control={control}
          error={errors.name}
          autoFocus
        />
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

        <DatePicker
          name='startDate'
          label='Start Date'
          control={control}
          error={errors.startDate as FieldError | void}
        />
        <DatePicker
          name='endDate'
          label='End Date'
          control={control}
          error={errors.endDate as FieldError | void}
        />
        <Button
          type='submit'
          variant='contained'
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress color='inherit' size='16px' /> : null
          }
        >
          {isLoading ? 'Submitting' : 'Create Event'}
        </Button>
      </Stack>
    </Form>
  );
};

export default EventForm;
