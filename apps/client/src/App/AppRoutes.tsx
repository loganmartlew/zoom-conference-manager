import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<h1>Router Working</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
