import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import AppRoutes from './AppRoutes';
import './imports.css';
import Providers from './Providers';

const App: FC = () => (
  <Providers>
    <CssBaseline />
    <AppRoutes />
  </Providers>
);

export default App;
