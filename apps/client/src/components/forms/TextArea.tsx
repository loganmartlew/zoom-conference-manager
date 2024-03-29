import {
  Controller,
  Control,
  RegisterOptions,
  Path,
  FieldError,
} from 'react-hook-form';
import { TextField } from '@mui/material';

interface Props<T> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  error: FieldError | void;
  rules?: RegisterOptions;
  rows?: number;
  minRows?: number;
  maxRows?: number;
}

// eslint-disable-next-line react/function-component-definition
function TextInput<T>({
  name,
  label,
  control,
  error,
  rules,
  rows,
  minRows,
  maxRows,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          required={!!rules?.required}
          error={!!error}
          helperText={error?.message}
          multiline
          rows={rows}
          minRows={minRows}
          maxRows={maxRows}
        />
      )}
    />
  );
}

export default TextInput;
