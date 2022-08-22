import { FC, useState } from 'react';
import { DropzoneDialog } from 'react-mui-dropzone';
import { Button } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { axios } from '../../config/axios';
// import FileUpload from '../features/AddAccount/FileProcess';

interface Props {
  id: string;
}

const Process: FC<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const { id } = props;

  const send = () => {
    const formData = new FormData();
    formData.append('excelFile', files[0]);
    axios.post(`/events/:Id/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
          setFiles(newFiles);
          setOpen(false);
          console.log(files[0]);
          send();
        }}
      />
    </>
  );
};

export default Process;
