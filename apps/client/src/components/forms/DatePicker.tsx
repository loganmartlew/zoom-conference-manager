import { TextField } from '@mui/material';
import {
  Controller,
  Control,
  RegisterOptions,
  Path,
  FieldError,
} from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import locale from 'dayjs/locale/en-nz';

interface Props<T> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  error: FieldError | void;
  rules?: RegisterOptions;
}

// eslint-disable-next-line react/function-component-definition
function CustomDatePicker<T>({ name, label, control, rules, error }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <DatePicker
          {...field}
          views={['day', 'month', 'year']}
          inputFormat='DD/MM/YYYY'
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

export default CustomDatePicker;
