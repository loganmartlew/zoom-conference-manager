import { Controller, Control, RegisterOptions, Path } from 'react-hook-form';
import { TextField } from '@mui/material';

interface Props<T> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  rules?: RegisterOptions;
}

// eslint-disable-next-line react/function-component-definition
function TextInput<T>({ name, label, control, rules }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField {...field} label={label} required={!!rules?.required} />
      )}
    />
  );
}

export default TextInput;
