import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import AppRoutes from './AppRoutes';
import './imports.css';

const App: FC = () => (
  <>
    <CssBaseline />
    <AppRoutes />
  </>
);

export default App;
