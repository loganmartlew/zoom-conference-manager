import { FC } from 'react';
import { EventDTO } from '@zoom-conference-manager/api-interfaces';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button, styled } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'dayjs/locale/en-nz';
import TextInput from '../../components/forms/TextInput';
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
      {/* <Controller
        name='name'
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField {...field} label='Name' required />}
      /> */}
      <TextInput
        name='name'
        label='Name'
        control={control}
        rules={{ required: true }}
      />
      <Controller
        name='description'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label='Description'
            required
            multiline
            minRows={3}
          />
        )}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} locale={locale}>
        <Controller
          name='startDate'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              {...field}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Start Date'
                  required
                  helperText={locale.formats.L?.toLowerCase()}
                />
              )}
            />
          )}
        />
        <Controller
          name='endDate'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              {...field}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='End Date'
                  required
                  helperText={locale.formats.L?.toLowerCase()}
                />
              )}
            />
          )}
        />
      </LocalizationProvider>

      <Button type='submit' variant='contained'>
        Create Event
      </Button>
    </Form>
  );
};

export default EventInput;
