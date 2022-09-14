import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';
import dayjs from 'dayjs';
import RehearsalsCard from '../features/Rehersals/RehearsalsCard';

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
      <RehearsalsCard
        name='test'
        startDate={dayjs('2022-08-09').toDate()}
        startTime={dayjs('2022-08-09 12:00').toDate()}
        endTime={dayjs('2022-08-09 12:30').toDate()}
        presenter='Test Presenter'
      />
    </Stack>
  );
};

export default RehearsalsPage;
