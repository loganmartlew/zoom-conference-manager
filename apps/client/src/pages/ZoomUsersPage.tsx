import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import ZoomUserList from '../features/ZoomUsers/ZoomUserList';
import { useAllZoomUsers } from '../features/ZoomUsers/api/getZoomUsers';

const ZoomUsersPage: FC = () => {
  const { data, isLoading } = useAllZoomUsers();

  return (
    <Box sx={{ display: 'grid', placeContent: 'center' }}>
      <Typography variant='h3' sx={{ mb: 1 }}>
        Zoom Users
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Users in this list will be used to schedule meetings by this app
      </Typography>
      <ZoomUserList zoomUsers={data || []} isLoading={isLoading} />
    </Box>
  );
};

export default ZoomUsersPage;
