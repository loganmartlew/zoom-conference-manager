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
  const confirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm event details</DialogTitle>
      <DialogContent>
        {/* <DialogContentText> Name:  </DialogContentText>
        <DialogContentText>Description:  </DialogContentText>
        <DialogContentText> Start Date: </DialogContentText>
        <DialogContentText> End Date: </DialogContentText> */}
        <DialogContentText>
          {' '}
          Are the details entered correct?{' '}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={confirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
