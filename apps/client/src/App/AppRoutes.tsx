import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavLayout from '../features/Navigation/NavLayout';

import UpdateMeeting from '../features/Meetings/UpdateMeeting';
import { getMeetingData } from '../features/Meetings/api/getMeetingData';
import { updateMeetingData } from '../features/Meetings/api/updateMeetingData';
import EventsPage from '../pages/EventsPage';
import EventDetailsPage from '../pages/EventDetailsPage';
import NewEventPage from '../pages/NewEventPage';
import NewMeetingPage from '../pages/NewMeetingPage';
import AddAccount from '../pages/AddAccount';
import ZoomUsersPage from '../pages/ZoomUsersPage';

const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<NavLayout />}>
          <Route
            path='/'
            element={
              <UpdateMeeting
                ubid='11111'
                editOnRender={false}
                eventId='cc16d739-4eaf-40d9-95da-95ee07b253d3'
                getMeetingData={getMeetingData}
                updateMeetingData={updateMeetingData}
              />
            }
          />
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/dashboard' element={<h1>Dashboard</h1>} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/events/:id' element={<EventDetailsPage />} />
          <Route path='/new-event' element={<NewEventPage />} />
          <Route path='/new-meeting' element={<NewMeetingPage />} />
          <Route path='/add-account' element={<AddAccount />} />
          <Route path='/zoom-users' element={<ZoomUsersPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
