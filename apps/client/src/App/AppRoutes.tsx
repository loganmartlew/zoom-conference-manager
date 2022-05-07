import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import NewEventPage from '../pages/NewEventPage';

const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/new-event' element={<NewEventPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
