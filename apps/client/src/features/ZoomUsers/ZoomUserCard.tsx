import { Paper, Stack, Typography } from '@mui/material';
import { IZoomUser } from '@zoom-conference-manager/api-interfaces';
import { FC } from 'react';

interface Props {
  zoomUser: IZoomUser;
}

const ZoomUserCard: FC<Props> = ({ zoomUser }) => {
  return (
    <Paper
      sx={{
        padding: '1em',
      }}
      elevation={3}
    >
      <Stack spacing={1}>
        <Typography variant='h6'>{zoomUser.name}</Typography>
        <Typography variant='body2'>{zoomUser.email}</Typography>
      </Stack>
    </Paper>
  );
};

export default ZoomUserCard;
