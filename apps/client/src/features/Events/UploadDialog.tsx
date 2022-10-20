import { FC, useState } from 'react';
import { DropzoneDialog } from 'react-mui-dropzone';
import { useQueryClient } from 'react-query';
import { Button } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { FileUploadData, useUploadFile } from './api/uploadFile';
import { eventKey } from './api/getEvent';
// import FileUpload from '../features/AddAccount/FileProcess';

interface Props {
  id: string;
}

const UploadDialog: FC<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  // const [files, setFiles] = useState<File[]>([]);
  const { id } = props;

  const queryClient = useQueryClient();

  const onPostSuccess = () => {};

  const onPostError = (error: unknown, variables: FileUploadData) => {
    console.log(error, variables);
  };

  const { mutate } = useUploadFile(onPostSuccess, onPostError);

  const send = (files: File[]) => {
    setOpen(false);
    mutate({ file: files[0], eventId: id });

    queryClient.refetchQueries([...eventKey, id]);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant='outlined'
        size='small'
        startIcon={<Upload />}
      >
        Upload Meetings
      </Button>

      <DropzoneDialog
        acceptedFiles={[
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]}
        open={open}
        onClose={() => setOpen(false)}
        onSave={(newFiles) => {
          // setFiles(newFiles);
          send(newFiles);
        }}
      />
    </>
  );
};

export default UploadDialog;
