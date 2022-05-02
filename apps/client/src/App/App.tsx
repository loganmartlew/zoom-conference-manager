import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import AppRoutes from './AppRoutes';
import EventInput from '../features/EventInput';
import './imports.css';

const App: FC = () => (
  // <>
  //   <CssBaseline />
  //   <AppRoutes />
  // </>
  <EventInput />
);

export default App;
