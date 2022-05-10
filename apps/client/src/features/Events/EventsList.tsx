import { FC } from 'react';
import { useAllEvents } from './api/getEvents';
import EventCard from './EventCard';

const EventsList: FC = () => {
  const { data: events, isLoading, isError } = useAllEvents();

  if (isError) {
    return <p>An error occurred</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (events && events?.length < 1) {
    return <p>No Events</p>;
  }

  return (
    <>
      {events?.map((event) => {
        return (
          <EventCard
            name={event.name}
            desc={event.description}
            start={event.startDate}
            end={event.endDate}
          />
        );
      })}
    </>
  );
};

// {events && events.map((event) => <p key={event.id}>{event.name}</p>)}

export default EventsList;
