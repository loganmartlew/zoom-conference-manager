import { TextField } from '@mui/material';
import {
  Controller,
  Control,
  RegisterOptions,
  Path,
  FieldError,
} from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers';
import locale from 'dayjs/locale/en-nz';

interface Props<T> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  error: FieldError | void;
  rules?: RegisterOptions;
}

// eslint-disable-next-line react/function-component-definition
function CustomDatetimePicker<T>({
  name,
  label,
  control,
  rules,
  error,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <DateTimePicker
          {...field}
          views={['day', 'month', 'year', 'hours', 'minutes']}
          inputFormat='DD/MM/YYYY hh:mm'
          ampm
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={!!rules?.required}
              error={!!error}
              helperText={error?.message || locale.formats.L?.toLowerCase()}
            />
          )}
        />
      )}
    />
  );
}

export default CustomDatetimePicker;
