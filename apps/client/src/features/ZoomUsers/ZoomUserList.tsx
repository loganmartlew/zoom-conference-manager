import { IZoomUser } from '@zoom-conference-manager/api-interfaces';
import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import ZoomUserCard from './ZoomUserCard';

interface Props {
  zoomUsers: IZoomUser[];
  isLoading: boolean;
}

const ZoomUserList: FC<Props> = ({ zoomUsers, isLoading }) => {
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!zoomUsers || zoomUsers.length < 1) {
    return <Typography>No users</Typography>;
  }

  return (
    <Stack spacing={2}>
      {zoomUsers.map((zoomUser) => (
        <ZoomUserCard key={zoomUser.id} zoomUser={zoomUser} />
      ))}
    </Stack>
  );
};

export default ZoomUserList;
