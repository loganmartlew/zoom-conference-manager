import { FC } from 'react';
import RecordingsList from '../features/Recordings/RecordingsList';

const RecordingsPage: FC = () => {
  return (
    <>
      <h1>Recent Events</h1>
      <RecordingsList />
    </>
  );
};

export default RecordingsPage;
