import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, Button, Typography, styled } from '@mui/material';

const Form = styled('form')({});

const DateContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

function getCurrentDate(): string {
  const dateString = new Date().toLocaleDateString();
  const values = dateString.split('/');

  const paddedValues = values.map((value) => String(value).padStart(2, '0'));
  const [month, day, year] = paddedValues;

  return `${year}-${month}-${day}`;
}

const EventInput: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    start: getCurrentDate(),
    end: getCurrentDate(),
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function submitEvent(event: FormEvent) {
    // call axios to push of the request need api route
    // navigate to some other route

    event.preventDefault();
    console.log(formData);
  }

  // refactor any inline styling
  return (
    <Form
      autoComplete='off'
      onSubmit={submitEvent}
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
      <TextField
        required
        name='name'
        id='outlined-name'
        label='Name'
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        name='desc'
        id='outlined-desc'
        label='Description'
        value={formData.desc}
        onChange={handleChange}
      />
      <Box
        sx={{
          display: 'flex',
          gap: '1em',
        }}
      >
        <DateContainer>
          <Typography variant='caption'>Start Date</Typography>
          <input
            required
            name='start'
            value={formData.start}
            onChange={handleChange}
            type='date'
            id='start'
          />
        </DateContainer>
        <DateContainer>
          <Typography variant='caption'>End Date</Typography>
          <input
            required
            name='end'
            value={formData.end}
            onChange={handleChange}
            type='date'
            id='end'
          />
        </DateContainer>
      </Box>

      <Button type='submit' variant='contained'>
        Create Event
      </Button>
    </Form>
  );
};

export default EventInput;
