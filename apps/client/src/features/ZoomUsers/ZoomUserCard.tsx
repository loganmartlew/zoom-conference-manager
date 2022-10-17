import { IZoomUser } from '@zoom-conference-manager/api-interfaces';
import { FC, useState } from 'react';
import { Paper, Stack, Typography, Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import DeleteUserDialog from './DeleteUserDialog';
import { useDeleteZoomUser } from './api/deleteZoomUser';

interface Props {
  zoomUser: IZoomUser;
}

const ZoomUserCard: FC<Props> = ({ zoomUser }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate } = useDeleteZoomUser(
    () => {},
    () => {}
  );

  return (
    <Paper
      sx={{
        padding: '1em',
      }}
      elevation={3}
    >
      <Stack direction='row' spacing={1}>
        <Stack spacing={1} sx={{ flexGrow: '1' }}>
          <Typography variant='h6'>{zoomUser.name}</Typography>
          <Typography variant='body2'>{zoomUser.email}</Typography>
        </Stack>
        <Box sx={{ display: 'grid', placeContent: 'center' }}>
          <IconButton
            aria-label='delete'
            color='error'
            onClick={() => setDialogOpen(true)}
          >
            <Delete />
          </IconButton>
          <DeleteUserDialog
            open={dialogOpen}
            handleClose={() => setDialogOpen(false)}
            onConfirm={() => {
              mutate(zoomUser.id);
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default ZoomUserCard;
