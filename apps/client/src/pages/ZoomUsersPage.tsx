import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import ZoomUserList from '../features/ZoomUsers/ZoomUserList';

const ZoomUsersPage: FC = () => {
  return (
    <Box sx={{ display: 'grid', placeContent: 'center' }}>
      <Typography variant='h3' sx={{ mb: 1 }}>
        Zoom Users
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Users in this list will be used to schedule meetings by this app
      </Typography>
      <ZoomUserList zoomUsers={[]} />
    </Box>
  );
};

export default ZoomUsersPage;
