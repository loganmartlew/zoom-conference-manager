import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import RehearsalsForm from '../features/Rehersals/RehearsalsForm';

const NewRehearsalsPage: FC = () => {
  return (
    <Box sx={{ display: 'grid', placeContent: 'center' }}>
      <Typography variant='h3' sx={{ mb: 3 }}>
        New Rehearsal
      </Typography>
      <RehearsalsForm />
    </Box>
  );
};

export default NewRehearsalsPage;
