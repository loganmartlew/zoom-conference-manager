import { FC, useState } from 'react';
import { IMeeting } from '@zoom-conference-manager/api-interfaces';
import { Collapse, Alert, AlertTitle, Stack } from '@mui/material';
import RecordingsMeetingsCard from './RecordingsMeetingsCard';

interface Props {
  meetings: IMeeting[];
}

const RecordingsMeetingsList: FC<Props> = ({ meetings }) => {
  const [showNoMeetings, setShowNoMeetings] = useState(true);

  if (meetings && meetings?.length < 1) {
    return (
      <Collapse in={showNoMeetings}>
        <Alert
          onClose={() => {
            setShowNoMeetings(false);
          }}
          severity='success'
          variant='outlined'
        >
          <AlertTitle>No Meetings</AlertTitle>
          No events found...
        </Alert>
      </Collapse>
    );
  }

  if (!meetings) {
    return (
      <Collapse in={showNoMeetings}>
        <Alert
          onClose={() => {
            setShowNoMeetings(false);
          }}
          severity='success'
          variant='outlined'
        >
          <AlertTitle>No Meetings</AlertTitle>
          No events found...
        </Alert>
      </Collapse>
    );
  }

  return (
    <Stack spacing={3}>
      {meetings.map((meeting) => (
        <RecordingsMeetingsCard meeting={meeting} />
      ))}
    </Stack>
  );
};

export default RecordingsMeetingsList;
