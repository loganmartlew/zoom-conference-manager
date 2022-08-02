import { FC, useCallback, useState } from 'react';
import { Button } from '@mui/material';
import ConfirmationDialog from '../../components/ConfirmationDialog';

interface Props {
  type: 'publish' | 'unpublish';
  onConfirm: () => void;
}

const PublishDialog: FC<Props> = ({ type, onConfirm }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const confirm = () => {
    onConfirm();
    setDialogOpen(false);
  };

  const getTitleAndText = useCallback(() => {
    if (type === 'publish') {
      return {
        title: 'Publish Event',
        text: 'Are you sure you want to publish the event?',
      };
    }
    if (type === 'unpublish') {
      return {
        title: 'Unublish Event',
        text: 'Are you sure you want to unpublish the event?',
      };
    }

    return { title: '', text: '' };
  }, [type]);

  return (
    <>
      <Button
        onClick={() => setDialogOpen(true)}
        variant='contained'
        size='small'
        sx={{ width: 'max-content' }}
      >
        {type === 'publish' ? 'Publish' : 'Unpublish'}
      </Button>
      <ConfirmationDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onConfirm={() => confirm()}
        title={getTitleAndText().title}
        text={getTitleAndText().text}
      />
    </>
  );
};

export default PublishDialog;
