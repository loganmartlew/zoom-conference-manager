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
        padding: '1.5em',
      }}
      elevation={3}
    >
      <Stack spacing={2}>
        <Typography>{zoomUser.name}</Typography>
        <Typography>{zoomUser.email}</Typography>
      </Stack>
    </Paper>
  );
};

export default ZoomUserCard;
