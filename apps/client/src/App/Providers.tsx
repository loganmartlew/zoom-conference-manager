import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import locale from 'dayjs/locale/en-nz';
import theme from './theme';

const queryClient = new QueryClient();

const Providers: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs} locale={locale}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default Providers;
