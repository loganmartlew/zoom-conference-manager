import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';
import RehearsalsList from '../features/Rehersals/RehearsalsList';

const RehearsalsPage: FC = () => {
  return (
    <Stack>
      <Stack direction='row' spacing={7}>
        <Typography variant='h3' sx={{ mb: 3 }}>
          Rehearsals
        </Typography>
        <Button
          variant='contained'
          component={Link}
          to='/new-rehearsal'
          sx={{
            width: 'max-content',
            height: 'max-content',
          }}
        >
          Create Rehearsal
        </Button>
      </Stack>
      <RehearsalsList rehearsals={[]} />
    </Stack>
  );
};

export default RehearsalsPage;
