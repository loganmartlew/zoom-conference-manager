import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
  return (
    <Stack spacing={3}>
      <Typography variant='h3'>Home</Typography>
      <Stack spacing={1}>
        <Typography variant='h5'>Suggested Actions</Typography>
        <Stack direction='row' spacing={2}>
          <Button component={Link} to='/new-event' variant='outlined'>
            Create an Event
          </Button>
          <Button component={Link} to='/new-meeting' variant='outlined'>
            Add a Meeting
          </Button>
          <Button component={Link} to='/zoom-users' variant='outlined'>
            Add More Users
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HomePage;
