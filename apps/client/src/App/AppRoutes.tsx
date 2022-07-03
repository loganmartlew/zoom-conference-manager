import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavLayout from '../features/Navigation/NavLayout';

// import EventsPage from '../pages/EventsPage';
// import EventDetailsPage from '../pages/EventDetailsPage';
// import NewEventPage from '../pages/NewEventPage';
// import NewMeetingPage from '../pages/NewMeetingPage';
import UpdateMeeting from '../features/Meetings/UpdateMeeting';

import UpdateMeetingState from '../features/Meetings/MeetingTypes/UpdateMeetingState';

const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<NavLayout />}>
          <Route
            path='/'
            element={
              <UpdateMeeting
                getMeeting={(id: number) => {
                  if (id === 1) {
                    const state: UpdateMeetingState = {
                      ubid: '000000000',
                      name: 'Test',
                      date: '23/06/22',
                      time: '1400',
                      duration: '1',
                      event: 'hello',
                    };
                    return state;
                  }
                  const state: UpdateMeetingState = {
                    ubid: '000000001',
                    name: 'Test',
                    date: '23/06/22',
                    time: '1400',
                    duration: '1',
                    event: 'hello',
                  };
                  return state;
                }}
                meetingID={1}
              />
            }
          />
          {/* <Route path='/' element={<h1>Home</h1>} />
          <Route path='/dashboard' element={<h1>Dashboard</h1>} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/events/:id' element={<EventDetailsPage />} />
          <Route path='/new-event' element={<NewEventPage />} />
          <Route path='/new-meeting' element={<NewMeetingPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
