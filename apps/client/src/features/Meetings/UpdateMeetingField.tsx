import { FC, ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  value: string | number;
  editField: (field: string) => void;
  isEditable: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const UpdateMeetingField: FC<Props> = (props: Props) => {
  const { value, editField, isEditable, handleChange, name } = props;
  return (
    <Box>
      {isEditable ? (
        <TextField
          defaultValue={value}
          label={name}
          name={name}
          onChange={handleChange}
        />
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
