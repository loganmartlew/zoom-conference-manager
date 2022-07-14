import { FC } from 'react';
import { Box, Typography } from '@mui/material';

const ZoomUsersPage: FC = () => {
  return (
    <Box sx={{ display: 'grid', placeContent: 'center' }}>
      <Typography variant='h3' sx={{ mb: 3 }}>
        Zoom Users
      </Typography>
      <Typography>
        Users in this list will be used to schedule meetings by this app
      </Typography>
    </Box>
  );
};

export default ZoomUsersPage;
