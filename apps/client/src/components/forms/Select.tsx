import { ReactNode } from 'react';
import {
  Controller,
  Control,
  RegisterOptions,
  Path,
  FieldError,
} from 'react-hook-form';
import { Select, FormHelperText, FormControl } from '@mui/material';

interface Props<T> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  error: FieldError | void;
  helperText?: string;
  rules?: RegisterOptions;
  children: ReactNode;
}

// eslint-disable-next-line react/function-component-definition
function CustomSelect<T>({
  name,
  label,
  control,
  rules,
  error,
  helperText,
  children,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl>
          <Select
            {...field}
            label={label}
            required={!!rules?.required}
            displayEmpty
            error={!!error}
          >
            {children}
          </Select>
          {helperText && (
            <FormHelperText error={!!error}>{helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

export default CustomSelect;
