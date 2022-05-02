import { FC, useState, ChangeEvent, MouseEvent } from 'react';
import { Box, TextField, Button } from '@mui/material';

const flexSpacing = {
  margin: '1rem auto',
  alignSelf: 'center',
};

const dateStyle = {
  display: 'flex',
  justifyContent: 'center',
  height: '20%',
};

const EventInput: FC = () => {
  function getCurrentDate(): string {
    const date = new Date();

    // append missing 0
    let month = date.getMonth().toString();
    if (month.length === 1) {
      month = `0${month}`;
    }

    let day = date.getDay().toString();
    if (day.length === 1) {
      day = `0${day}`;
    }

    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    start: getCurrentDate(),
    end: getCurrentDate(),
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    console.log(`value: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function submitEvent(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    // call axios to push of the request
    // navigate to some other route
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      height='100vh'
      width='100%'
    >
      <TextField
        style={flexSpacing}
        required
        name='name'
        id='outlined-required'
        label='Name'
        defaultValue='name'
        value={formData.name}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={handleChange}
      />
      <TextField
        style={flexSpacing}
        name='desc'
        id='outlined'
        label='Description'
        defaultValue='description'
        value={formData.desc}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={handleChange}
      />
      <div style={dateStyle}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor='start'>Start Date</label>
          <input
            style={flexSpacing}
            name='start'
            value={formData.start}
            onChange={handleChange}
            type='date'
            id='start'
          />
        </div>
        <div style={{ width: '1rem' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor='end'>End Date</label>
          <input
            style={flexSpacing}
            name='end'
            value={formData.end}
            onChange={handleChange}
            type='date'
            id='end'
          />
        </div>
      </div>

      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Button onClick={submitEvent} variant='outlined'>
        Create Event
      </Button>
    </Box>
  );
};

export default EventInput;
