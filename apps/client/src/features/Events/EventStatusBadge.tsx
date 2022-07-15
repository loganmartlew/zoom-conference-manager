import { FC, useCallback } from 'react';
import { Chip } from '@mui/material';

interface Props {
  status: 'draft' | 'published';
}

const EventStatusBadge: FC<Props> = ({ status }) => {
  const label = status.charAt(0).toUpperCase() + status.substring(1);

  const getColor = useCallback(() => {
    switch (status) {
      case 'draft':
        return 'warning';
      case 'published':
        return 'success';
      default:
        return 'primary';
    }
  }, [status]);

  return (
    <Chip
      label={label}
      size='small'
      color={getColor()}
      sx={{ width: 'max-content' }}
    />
  );
};

export default EventStatusBadge;
