import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import locale from 'dayjs/locale/en-nz';

const queryClient = new QueryClient();

const Providers: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs} locale={locale}>
        {children}
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default Providers;
