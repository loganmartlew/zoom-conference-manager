import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import locale from 'dayjs/locale/en-nz';
import AppRoutes from './AppRoutes';
import './imports.css';

const App: FC = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs} locale={locale}>
    <CssBaseline />
    <AppRoutes />
  </LocalizationProvider>
);

export default App;
