import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavLayout from '../features/Navigation/NavLayout';

import EventsPage from '../pages/EventsPage';
import EventDetailsPage from '../pages/EventDetailsPage';
import NewEventPage from '../pages/NewEventPage';
import NewMeetingPage from '../pages/NewMeetingPage';
import ZoomUsersPage from '../pages/ZoomUsersPage';
import RecordingsPage from '../pages/RecordingsPage';
import RecordingsDetailsPage from '../pages/RecordingsDetailsPage';
import DashboardPage from '../pages/DashboardPage';

const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/events/:id' element={<EventDetailsPage />} />
          <Route path='/new-event' element={<NewEventPage />} />
          <Route path='/new-meeting' element={<NewMeetingPage />} />
          <Route path='/zoom-users' element={<ZoomUsersPage />} />
          <Route path='/recordings' element={<RecordingsPage />} />
          <Route path='/recordings/:id' element={<RecordingsDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
