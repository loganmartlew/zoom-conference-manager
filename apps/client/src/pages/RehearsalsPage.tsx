import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';

const RehearsalsPage: FC = () => {
  return (
    <Stack direction='row' spacing={7}>
      <Typography variant='h3' sx={{ mb: 3 }}>
        Rehearsals
      </Typography>
      <Button
        variant='contained'
        component={Link}
        to='/create-rehearsal'
        sx={{
          width: 'max-content',
          height: 'max-content',
        }}
      >
        Create Rehearsal
      </Button>
    </Stack>
  );
};

export default RehearsalsPage;
