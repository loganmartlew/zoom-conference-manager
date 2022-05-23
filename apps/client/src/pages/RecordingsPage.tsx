import { FC } from 'react';
import EventsList from '../features/Events/EventsList';

const RecordingsPage: FC = () => {
  return (
    <>
      <h1>Recent Events</h1>
      <EventsList />
    </>
  );
};

export default RecordingsPage;
