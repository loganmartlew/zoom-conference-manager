import { FC, useState } from 'react';
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useClearEventMeetings } from './api/clearEventMeetings';
import ConfirmationDialog from '../../components/ConfirmationDialog';

interface Props {
  eventId: string;
}

const ClearMeetingsButton: FC<Props> = ({ eventId }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onDeleteSuccess = () => {
    setOpen(false);
  };

  const onDeleteError = (err: unknown) => {
    console.log(err);
  };

  const { mutate } = useClearEventMeetings(onDeleteSuccess, onDeleteError);

  const clearMeetings = () => {
    mutate(eventId);
  };

  return (
    <>
      <Button
        variant='contained'
        size='small'
        color='error'
        startIcon={<Delete />}
        onClick={() => setOpen(true)}
      >
        Clear Meetings
      </Button>
      <ConfirmationDialog
        open={open}
        handleClose={() => setOpen(false)}
        onConfirm={clearMeetings}
        title='Clear Meetings'
        text='Are you sure you want to clear the meetings?'
      />
    </>
  );
};

export default ClearMeetingsButton;
