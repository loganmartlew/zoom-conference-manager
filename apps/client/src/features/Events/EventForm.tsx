import { FC } from 'react';
import { EventDTO } from '@zoom-conference-manager/api-interfaces';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button, styled } from '@mui/material';
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
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      name: '',
      description: '',
      startDate: dayjs(),
      endDate: dayjs(),
    },
  });

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1em',
        width: '100%',
        height: '100vh',
      }}
    >
      <TextInput
        name='name'
        label='Name'
        control={control}
        rules={{ required: true }}
      />
      <TextArea
        name='description'
        label='Description'
        control={control}
        rules={{ required: true }}
        minRows={3}
      />
      <DatePicker
        name='startDate'
        label='Start Date'
        control={control}
        rules={{ required: true }}
      />
      <DatePicker
        name='endDate'
        label='End Date'
        control={control}
        rules={{ required: true }}
      />
      <Button type='submit' variant='contained'>
        Create Event
      </Button>
    </Form>
  );
};

export default EventInput;
