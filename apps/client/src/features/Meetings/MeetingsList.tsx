import { FC, useState } from 'react';
import { IMeeting } from '@zoom-conference-manager/api-interfaces';
import {
  Collapse,
  Alert,
  AlertTitle,
  Stack,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import MeetingCard from './MeetingCard';

interface Props {
  meetings: IMeeting[];
}

const MeetingsList: FC<Props> = ({ meetings }) => {
  const [showNoMeetings, setShowNoMeetings] = useState(true);
  const [meetingSearch, setMeetingSearch] = useState<string>('all');

  const handleMeetingSearch = (e: SelectChangeEvent) => {
    setMeetingSearch(e.target.value as string);
  };

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

  // TODO: CHANGE MEETING STUCTURE IN SOME WAY TO SHOW IF A MEETING
  // IS CURRENTLY ACTIVE, MUST BE DONE EITHER BY FRONTEND OR MORE
  // LIKELY BACKEND.
  return (
    <>
      <Stack spacing={3}>
        <Select
          value={meetingSearch}
          label='Meeting Search'
          onChange={handleMeetingSearch}
        >
          <MenuItem value='all'>All Meetings</MenuItem>
          <MenuItem value='active'>Active Meetings</MenuItem>
        </Select>
        {meetings.map((meeting) => (
          <MeetingCard meeting={meeting} />
        ))}
      </Stack>
    </>
  );
};

export default MeetingsList;
