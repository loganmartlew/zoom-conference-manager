import { IZoomUser } from '@zoom-conference-manager/api-interfaces';
import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import ZoomUserCard from './ZoomUserCard';

interface Props {
  zoomUsers: IZoomUser[];
}

const ZoomUserList: FC<Props> = ({ zoomUsers }) => {
  if (!zoomUsers || zoomUsers.length < 1) {
    return <Typography>No users...</Typography>;
  }

  return (
    <Stack>
      {zoomUsers.map((zoomUser) => (
        <ZoomUserCard key={zoomUser.id} zoomUser={zoomUser} />
      ))}
    </Stack>
  );
};

export default ZoomUserList;
