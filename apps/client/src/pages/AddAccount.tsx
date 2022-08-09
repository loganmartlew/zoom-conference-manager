import { FC, useState } from 'react';
import { DropzoneDialog } from 'react-mui-dropzone';
import { axios } from '../config/axios';
import AddAccount from '../features/AddAccount/AddAccount';
// import FileUpload from '../features/AddAccount/FileProcess';

const Add: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const send = () => {
    const formData = new FormData();
    formData.append('excelFile', files[0]);
    axios.post(
      '/events/e38951d4-affb-4822-81a1-3737315a9590/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  };

  return (
    <>
      <AddAccount />
      {/* <FileUpload /> */}
      <button type='button' onClick={() => setOpen(true)}>
        Upload
      </button>
      <button type='button' onClick={send}>
        Send
      </button>
      <DropzoneDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={(newFiles) => setFiles(newFiles)}
      />
    </>
  );
};

export default Add;
