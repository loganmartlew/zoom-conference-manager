import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavLayout from '../features/Navigation/NavLayout';

const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<NavLayout collapsable />}>
          <Route path='/' element={<h1>Index</h1>} />
          <Route path='/dashboard' element={<h1>Dashboard</h1>} />
          <Route path='/events' element={<h1>Events</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
