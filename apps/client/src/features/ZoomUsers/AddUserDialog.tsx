import { ZoomUserDTO } from '@zoom-conference-manager/api-interfaces';
import { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  styled,
} from '@mui/material';
import { SubmitHandler } from 'react-hook-form';
import { IFormInput, useUserForm } from './useUserForm';
import TextInput from '../../components/forms/TextInput';

const Form = styled('form')({});

interface Props {
  open: boolean;
  handleClose: () => void;
  onConfirm: (zoomUserDto: ZoomUserDTO) => void;
}

const AddUserDialog: FC<Props> = ({ open, handleClose, onConfirm }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useUserForm();

  const close = () => {
    reset();
    handleClose();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const zoomUserData: ZoomUserDTO = data;
    onConfirm(zoomUserData);
    close();
  };

  return (
    <Dialog open={open} onClose={close}>
      <Form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add Zoom User</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ minWidth: '300px', padding: '1em 0' }}>
            <TextInput
              name='name'
              label='Name'
              control={control}
              error={errors.name}
            />
            <TextInput
              name='email'
              label='Email'
              control={control}
              error={errors.email}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type='button' onClick={close}>
            Cancel
          </Button>
          <Button type='submit'>Add User</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default AddUserDialog;
