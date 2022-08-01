import { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface Props {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: FC<Props> = ({ open, handleClose, onConfirm }) => {
  const close = () => {
    handleClose();
  };

  const confirm = () => {
    onConfirm();
    close();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Publish Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to publish the event?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button type='button' onClick={close}>
          Cancel
        </Button>
        <Button onClick={confirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
