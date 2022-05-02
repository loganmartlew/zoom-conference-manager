import { FC, useState, ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';

const style = {
  marginTop: '1rem',
};

const EventInput: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    start: new Date().toString(),
    end: new Date().toString(),
  });

  console.log(formData.start);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    console.log(`value: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      flexDirection='column'
      height='100vh'
    >
      <TextField
        style={style}
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
        name='desc'
        id='outlined'
        label='Description'
        defaultValue='description'
        value={formData.desc}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={handleChange}
      />
      <div>
        <input
          name='start'
          value={formData.start}
          onChange={handleChange}
          type='date'
        />
        <input
          name='end'
          value={formData.end}
          onChange={handleChange}
          type='date'
        />
      </div>
    </Box>
  );
};

export default EventInput;
