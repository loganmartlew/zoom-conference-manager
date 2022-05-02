import { FC, useState, ChangeEvent, MouseEvent } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

// refactor this to be in separate file maybe?
const flexSpacing = {
  margin: '1rem auto',
  alignSelf: 'center',
};

const flexSpacingDate = {
  alignSelf: 'center',
  marginBottom: '1rem',
};

const dateStyle = {
  display: 'flex',
  justifyContent: 'center',
  columnGap: '1rem',
  margin: '1rem auto',
};

function getCurrentDate(): string {
  const date = new Date();

  // append missing 0
  let month = (Number(date.getMonth()) + 1).toString(); // get month returns the a month between 0 - 11;
  if (month.length === 1) {
    month = `0${month}`;
  }

  let day = (Number(date.getDay()) + 1).toString(); // get day returns a day between 0 - 6
  if (day.length === 1) {
    day = `0${day}`;
  }

  const year = date.getFullYear().toString();
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

  function submitEvent(event: MouseEvent<HTMLElement>) {
    // call axios to push of the request need api route
    // navigate to some other route

    event.preventDefault();
    console.log(formData);
  }

  // refactor any inline styling
  return (
    <Box
      component='form'
      autoComplete='off'
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
        id='outlined-name'
        label='Name'
        value={formData.name}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={handleChange}
      />
      <TextField
        style={flexSpacing}
        name='desc'
        id='outlined-desc'
        label='Description'
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
            rowGap: '1px',
            margin: 'auto',
          }}
        >
          <Typography variant='caption'>Start Date</Typography>
          <input
            required
            style={flexSpacingDate}
            name='start'
            value={formData.start}
            onChange={handleChange}
            type='date'
            id='start'
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
          }}
        >
          <Typography variant='caption'>End Date</Typography>
          <input
            required
            style={flexSpacingDate}
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
