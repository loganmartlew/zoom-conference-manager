import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavLayout from '../features/Navigation/NavLayout';

import EventsPage from '../pages/EventsPage';
import NewEventPage from '../pages/NewEventPage';
import NewMeetingPage from '../pages/NewMeetingPage';

const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path='/' element={<h1>Home</h1>} />
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
