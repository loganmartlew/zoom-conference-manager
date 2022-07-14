// import "./styles.css";
import React from 'react';
import { FileUpload, FileUploadProps } from "./FileUpload";

const fileUploadProp: FileUploadProps = {
  accept: 'image/*',
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (
          event.target.files !== null &&
          event.target?.files?.length > 0
      ) {
          console.log(`Saving ${event.target.value}`)
      }
  },
  onDrop: (event: React.DragEvent<HTMLElement>) => {
      console.log(`Drop ${event.dataTransfer.files[0].name}`)
  },
}

// eslint-disable-next-line react/function-component-definition
export default function App() {
  return (
    <div className="App">
      {/* <FileUpload {...fileUploadProp} imageButton/> */}
      <FileUpload {...fileUploadProp} />
    </div>
  );
}
