import { FC, useState } from 'react';
import { IMeeting } from '@zoom-conference-manager/api-interfaces';
import { Collapse, Alert, AlertTitle } from '@mui/material';
import MeetingCard from './MeetingCard';

interface Props {
  meetings: IMeeting[];
}

const MeetingsList: FC<Props> = ({ meetings }) => {
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
    <>
      {meetings.map((meeting) => (
        <MeetingCard meeting={meeting} />
      ))}
    </>
  );
};

export default MeetingsList;
