import { FC } from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { environment } from '../environments/environment';

const DashboardPage: FC = () => {
  const seed = () => {
    fetch(`${environment.apiUrl}/seed`, {
      method: 'POST',
    });
  };

  const reset = () => {
    fetch(`${environment.apiUrl}/reset`, {
      method: 'POST',
    });
  };

  return (
    <Stack spacing={2}>
      <Typography variant='h3'>Dashboard</Typography>
      <Typography variant='h5'>Demo Tools</Typography>
      <Stack direction='row' spacing={2}>
        <Button
          variant='contained'
          size='small'
          sx={{ width: 'max-content' }}
          onClick={seed}
        >
          Seed Data
        </Button>
        <Button
          variant='contained'
          size='small'
          color='error'
          sx={{ width: 'max-content' }}
          onClick={reset}
        >
          Reset Data
        </Button>
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
