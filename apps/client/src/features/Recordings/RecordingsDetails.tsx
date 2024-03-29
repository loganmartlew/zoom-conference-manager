import { FC } from 'react';
import { IEvent } from '@zoom-conference-manager/api-interfaces';
import { Typography, Stack } from '@mui/material';
import RecordingsMeetingsList from './RecordingsMeetingsList';

interface Props {
  event: IEvent | undefined;
  isLoading: boolean;
}

const RecordingsDetails: FC<Props> = ({ event, isLoading }) => {
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!event) {
    return <Typography>Event not found.</Typography>;
  }
  return (
    <Stack spacing={2}>
      <Typography variant='h5'>Dates</Typography>
      <Stack spacing={1}>
        <Typography>{`Start: ${event.startDate}`}</Typography>
        <Typography>{`End: ${event.endDate}`}</Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant='h5'>Description</Typography>
        <Typography>{event.description}</Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant='h5'>Meetings</Typography>
        <RecordingsMeetingsList meetings={event.meetings} />
      </Stack>
    </Stack>
  );
};

export default RecordingsDetails;
