import { FC, useEffect } from 'react';
import { EventDTO } from '@zoom-conference-manager/api-interfaces';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Stack, styled } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import TextInput from '../../components/forms/TextInput';
import TextArea from '../../components/forms/TextArea';
import DatePicker from '../../components/forms/DatePicker';
import { environment } from '../../environments/environment';

const Form = styled('form')({});

interface IFormInput {
  name: string;
  description: string;
  startDate: Dayjs;
  endDate: Dayjs;
}

const EventInput: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: '',
      description: '',
      startDate: dayjs(),
      endDate: dayjs(),
    },
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const eventData: EventDTO = {
      ...data,
      startDate: (data.startDate as Dayjs).format('YYYY-MM-DD'),
      endDate: (data.endDate as Dayjs).format('YYYY-MM-DD'),
    };

    // fetch(`${environment.apiUrl}/event`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ eventData }),
    // });

    console.log(eventData);
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
          name='name'
          label='Name'
          control={control}
          error={errors.name}
          rules={{ required: { value: true, message: 'Name is required' } }}
        />
        <TextArea
          name='description'
          label='Description'
          control={control}
          error={errors.description}
          rules={{
            required: { value: true, message: 'Description is required' },
          }}
          minRows={3}
        />
        <DatePicker
          name='startDate'
          label='Start Date'
          control={control}
          error={errors.startDate as FieldError | void}
          rules={{
            required: { value: true, message: 'Start Date is required' },
          }}
        />
        <DatePicker<IFormInput>
          name='endDate'
          label='End Date'
          control={control}
          error={errors.endDate as FieldError | void}
          rules={{ required: { value: true, message: 'End Date is required' } }}
        />
        <Button type='submit' variant='contained'>
          Create Event
        </Button>
      </Stack>
    </Form>
  );
};

export default EventInput;
