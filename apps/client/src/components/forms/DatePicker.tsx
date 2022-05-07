import { TextField } from '@mui/material';
import { Controller, Control, RegisterOptions, Path } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import locale from 'dayjs/locale/en-nz';

interface Props<T> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  rules?: RegisterOptions;
}

// eslint-disable-next-line react/function-component-definition
function CustomDatePicker<T>({ name, label, control, rules }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <DatePicker
          {...field}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={!!rules?.required}
              helperText={locale.formats.L?.toLowerCase()}
            />
          )}
        />
      )}
    />
  );
}

export default CustomDatePicker;
