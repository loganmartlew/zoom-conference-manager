import { FC } from 'react';
import EventsList from '../features/Events/EventsList';

const HomePage: FC = () => {
  return (
    <>
      <h1>Events</h1>
      <EventsList />
    </>
  );
};

export default HomePage;
