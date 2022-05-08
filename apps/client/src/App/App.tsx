import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import globalStyles from './globalStyles';
import AppRoutes from './AppRoutes';
import './imports.css';

const App: FC = () => (
  <>
    <CssBaseline />
    {globalStyles}
    <AppRoutes />
  </>
);

export default App;
