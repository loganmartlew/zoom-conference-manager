import { FC } from 'react';
import { Typography } from '@mui/material';
import RehearsalsForm from '../features/Rehersals/RehearsalsForm';

const NewRehearsalsPage: FC = () => {
  return (
    <>
      <Typography variant='h3' sx={{ mb: 3 }}>
        New Rehearsal
      </Typography>
      <RehearsalsForm />
    </>
  );
};

export default NewRehearsalsPage;
