import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import locale from 'dayjs/locale/en-nz';
import AppRoutes from './AppRoutes';
import './imports.css';

const queryClient = new QueryClient();

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs} locale={locale}>
      <CssBaseline />
      <AppRoutes />
    </LocalizationProvider>
  </QueryClientProvider>
);

export default App;
