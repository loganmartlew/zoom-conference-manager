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
  title: string;
  text: string;
}

const ConfirmationDialog: FC<Props> = ({
  open,
  handleClose,
  onConfirm,
  title,
  text,
}) => {
  const close = () => {
    handleClose();
  };

  const confirm = () => {
    onConfirm();
    close();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          data-testid='confirmation--dialog--cancel'
          type='button'
          onClick={close}
        >
          Cancel
        </Button>
        <Button data-testid='confirmation--dialog--confirm' onClick={confirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
