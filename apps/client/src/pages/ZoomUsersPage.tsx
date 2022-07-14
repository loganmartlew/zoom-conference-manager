import { FC, useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import ZoomUserList from '../features/ZoomUsers/ZoomUserList';
import { useAllZoomUsers } from '../features/ZoomUsers/api/getZoomUsers';
import AddUserDialog from '../features/ZoomUsers/AddUserDialog';

const ZoomUsersPage: FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading } = useAllZoomUsers();

  return (
    <Box sx={{ display: 'grid', placeContent: 'center' }}>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Typography variant='h3' sx={{ mb: 1 }}>
          Zoom Users
        </Typography>
        <Button
          variant='contained'
          startIcon={<PersonAdd />}
          sx={{ height: 'max-content' }}
          onClick={() => setDialogOpen(true)}
        >
          Add User
        </Button>
        <AddUserDialog
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          onConfirm={() => {}}
        />
      </Stack>
      <Typography sx={{ mb: 3 }}>
        Users in this list will be used to schedule meetings by this app
      </Typography>
      <ZoomUserList zoomUsers={data || []} isLoading={isLoading} />
    </Box>
  );
};

export default ZoomUsersPage;
