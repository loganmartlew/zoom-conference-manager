import { IZoomUser } from '@zoom-conference-manager/api-interfaces';
import { FC } from 'react';
import { Stack, Typography } from '@mui/material';

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
        <div>{zoomUser.email}</div>
      ))}
    </Stack>
  );
};

export default ZoomUserList;
