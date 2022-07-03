import { FC, ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  value: string | number;
  editField: (field: string) => void;
  isEditable: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  error: boolean;
  errorText: string;
}

const UpdateMeetingField: FC<Props> = (props: Props) => {
  const { value, editField, isEditable, handleChange, name, error, errorText } =
    props;

  const getEditableField = (isError: boolean) => {
    if (!isError) {
      return (
        <TextField
          defaultValue={value}
          label={name}
          name={name}
          onChange={handleChange}
        />
      );
    }
    return (
      <TextField
        defaultValue={value}
        label={name}
        name={name}
        onChange={handleChange}
        error
        helperText={errorText}
      />
    );
  };

  return (
    <Box>
      {isEditable ? (
        getEditableField(error)
      ) : (
        <TextField disabled defaultValue={value} label={name} name={name} />
      )}
      <EditIcon
        color={isEditable ? 'primary' : 'secondary'}
        onClick={() => {
          editField(name);
        }}
      />
    </Box>
  );
};

export default UpdateMeetingField;
