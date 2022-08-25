import { FC } from 'react';
import { Stack, Typography, Button } from '@mui/material';

const RehearsalsPage: FC = () => {
  return (
    <Stack direction='row' spacing={7}>
      <Typography variant='h3' sx={{ mb: 3 }}>
        Rehearsals
      </Typography>
      <Button
        variant='contained'
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
