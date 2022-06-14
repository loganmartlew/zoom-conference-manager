import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavLayout from '../features/Navigation/NavLayout';

import HomePage from '../pages/HomePage';
import EventsPage from '../pages/EventsPage';
import NewEventPage from '../pages/NewEventPage';
import NewMeetingPage from '../pages/NewMeetingPage';

const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<h1>Dashboard</h1>} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/new-event' element={<NewEventPage />} />
          <Route path='/new-meeting' element={<NewMeetingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
