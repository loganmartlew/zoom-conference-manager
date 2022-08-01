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
      <DialogTitle>Confirm event details</DialogTitle>
      <DialogContent>
        <DialogContentText>Are the details entered correct?</DialogContentText>
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
