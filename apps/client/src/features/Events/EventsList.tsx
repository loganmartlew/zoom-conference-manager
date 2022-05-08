import { useState, useEffect, FC } from 'react';
import { IEvent } from '@zoom-conference-manager/types';
import axios from '../../config/axios';
import { environment } from '../../environments/environment';

const EventsList: FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get('/event')
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p>An error occurred</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && events.length < 1) {
    return <p>No Events</p>;
  }

  return (
    <>
      {events.map((event) => (
        <p key={event.id}>{event.name}</p>
      ))}
    </>
  );
};

export default EventsList;
