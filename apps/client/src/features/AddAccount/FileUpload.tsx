import { FC, useState, DragEvent, ChangeEvent } from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadDefaultImage from './FileUploadDefaultImage.jpg';

export type FileUploadProps = {
  imageButton?: boolean;
  accept: string;
  hoverLabel?: string;
  dropLabel?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  image?: {
    url: string;
    imageStyle?: {
      width?: string;
      height?: string;
    };
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
};

// const useStyle = makeStyles({
//   root: {
//     cursor: 'pointer',
//     textAlign: 'center',
//     display: 'flex',
//     '&:hover p,&:hover svg,& img': {
//       opacity: 1,
//     },
//     '& p, svg': {
//       opacity: 0.4,
//     },
//     '&:hover img': {
//       opacity: 0.3,
//     },
//   },
//   noMouseEvent: {
//     pointerEvents: 'none',
//   },
//   iconText: {
//     display: 'flex',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     alignItems: 'center',
//     position: 'absolute',
//   },
//   hidden: {
//     display: 'none',
//   },
//   onDragOver: {
//     '& img': {
//       opacity: 0.3,
//     },
//     '& p, svg': {
//       opacity: 1,
//     },
//   },
// });

export const FileUpload: FC<FileUploadProps> = ({
  accept,
  imageButton = false,
  hoverLabel = 'Click or drag to upload file',
  dropLabel = 'Drop file here',
  width = '600px',
  height = '100px',
  backgroundColor = '#fff',
  image: {
    url = FileUploadDefaultImage,
    imageStyle = {
      height: 'inherit',
    },
  } = {},
  onChange,
  onDrop,
}) => {
  const [imageUrl, setImageUrl] = useState(url);
  const [labelText, setLabelText] = useState<string>(hoverLabel);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const stopDefaults = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const dragEvents = {
    onMouseEnter: () => {
      setIsMouseOver(true);
    },
    onMouseLeave: () => {
      setIsMouseOver(false);
    },
    onDragEnter: (e: DragEvent) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLabel);
    },
    onDragLeave: (e: DragEvent) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e: DragEvent<HTMLElement>) => {
      stopDefaults(e);
      setLabelText(hoverLabel);
      setIsDragOver(false);
      if (imageButton && e.dataTransfer.files[0]) {
        setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]));
      }
      onDrop(e);
    },
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Object is possibly 'null'.
    if (imageButton && event.target.files[0]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Object is possibly 'null'.
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }

    onChange(event);
  };

  return (
    <>
      <input
        onChange={handleChange}
        accept={accept}
        id='file-upload'
        type='file'
      />

      <label htmlFor='file-upload' {...dragEvents}>
        <Box width={width} height={height} bgcolor={backgroundColor}>
          {imageButton && (
            <Box position='absolute' height={height} width={width}>
              <img alt='file upload' src={imageUrl} style={imageStyle} />
            </Box>
          )}

          {(!imageButton || isDragOver || isMouseOver) && (
            <>
              <Box height={height} width={width}>
                <CloudUploadIcon fontSize='large' />
                <Typography>{labelText}</Typography>
              </Box>
            </>
          )}
        </Box>
      </label>
    </>
  );
};
