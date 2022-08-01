import { FC, ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  value: string | number;
  editField: (field: string) => void;
  isEditable: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  errorText: string;
}

const UpdateMeetingField: FC<Props> = (props: Props) => {
  const { value, editField, isEditable, handleChange, name, errorText } = props;

  const getEditableField = () => {
    return (
      <TextField
        value={value}
        label={name}
        name={name}
        onChange={handleChange}
        data-testid={`update--meeting--${name}`}
        inputProps={{ 'data-testid': `update--meeting--textfield--${name}` }}
        helperText={errorText}
      />
    );
  };

  return (
    <Box>
      {isEditable ? (
        getEditableField()
      ) : (
        <TextField
          disabled
          value={value}
          label={name}
          name={name}
          data-testid={`update--meeting--${name}`}
          inputProps={{ 'data-testid': `update--meeting--textfield--${name}` }}
        />
      )}
      <EditIcon
        color={isEditable ? 'primary' : 'secondary'}
        onClick={() => {
          editField(name);
        }}
        data-testid={`update--meeting--icon--${name}`}
      />
    </Box>
  );
};

export default UpdateMeetingField;
