import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsList from '../features/Events/EventsList';
import NavLayout from '../features/Navigation/NavLayout';

import HomePage from '../pages/HomePage';
import NewEventPage from '../pages/NewEventPage';

const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<h1>Dashboard</h1>} />
          <Route path='/events' element={<EventsList />} />
          <Route path='/new-event' element={<NewEventPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
