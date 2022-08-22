import { TextField } from '@mui/material';
import {
  Controller,
  Control,
  RegisterOptions,
  Path,
  FieldError,
  FieldErrors,
  Merge,
} from 'react-hook-form';
import { TimePicker } from '@mui/x-date-pickers';

interface Props<T> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  error: Merge<FieldError, FieldErrors<Date>> | undefined;
  rules?: RegisterOptions;
}

// eslint-disable-next-line react/function-component-definition
function CustomTimePicker<T>({ name, label, control, rules, error }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TimePicker
          {...field}
          views={['hours', 'minutes']}
          inputFormat='HH:mm'
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={!!rules?.required}
              error={!!error}
              helperText={error?.message || 'HH:mm (24 hour format)'}
            />
          )}
        />
      )}
    />
  );
}

export default CustomTimePicker;
