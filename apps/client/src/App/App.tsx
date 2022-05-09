import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import globalStyles from './globalStyles';
import AppRoutes from './AppRoutes';
import './imports.css';
import Providers from './Providers';

const App: FC = () => (
  <Providers>
    <CssBaseline />
    {globalStyles}
    <AppRoutes />
  </Providers>
);

export default App;
