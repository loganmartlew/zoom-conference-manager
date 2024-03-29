import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import globalStyles from './globalStyles';
import AppRoutes from './AppRoutes';
import Providers from './Providers';
import notificationStyles from './notificationStyles';
import notificationSettings from './notificationSettings';
import './imports.css';
import 'react-toastify/dist/ReactToastify.css';

const App: FC = () => (
  <Providers>
    <CssBaseline />
    {globalStyles}
    <AppRoutes />
    <ToastContainer {...notificationSettings} />
    {notificationStyles}
  </Providers>
);

export default App;
