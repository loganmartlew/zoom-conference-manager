import { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

interface Props {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
}

const DeleteUserDialog: FC<Props> = ({ open, handleClose, onConfirm }) => {
  const confirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Zoom User</DialogTitle>
      <DialogContent>Are you sure you want to delete the user?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={confirm}>Delete User</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;
