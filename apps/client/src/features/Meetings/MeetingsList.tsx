import { FC, useState, useReducer } from 'react';
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

interface MeetingSearchState {
  searchType: string;
}

enum MeetingSearchType {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
}

interface MeetingSearchAction {
  meetingAction: MeetingSearchType;
  payload: string;
}

// some form of reducer to be added dynmically to
const meetingSearchReducer = (
  meetingSearchState: MeetingSearchState,
  meetingSearchAction: MeetingSearchAction
) => {
  switch (meetingSearchAction.meetingAction) {
    case MeetingSearchType.ALL:
      return {
        ...meetingSearchState,
        searchType: meetingSearchAction.payload,
      };
    case MeetingSearchType.ACTIVE:
      return {
        ...meetingSearchState,
        searchType: meetingSearchAction.payload,
      };
    default:
      return {
        ...meetingSearchState,
      };
  }
};

const MeetingsList: FC<Props> = ({ meetings }) => {
  const [showNoMeetings, setShowNoMeetings] = useState(true);
  const [meetingSearch, meetingSearchDispatch] = useReducer(
    meetingSearchReducer,
    { searchType: 'all' }
  );

  const handleMeetingSearch = (e: SelectChangeEvent) => {
    const selected = e.target.value as string;
    if (selected === 'all') {
      meetingSearchDispatch({
        meetingAction: MeetingSearchType.ALL,
        payload: selected,
      });
    } else if (selected === 'active') {
      meetingSearchDispatch({
        meetingAction: MeetingSearchType.ACTIVE,
        payload: selected,
      });
    }
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
          value={meetingSearch.searchType}
          label='Meeting Search'
          onChange={handleMeetingSearch}
        >
          <MenuItem value='all'>All Meetings</MenuItem>
          <MenuItem value='active'>Active Meetings</MenuItem>
        </Select>
        {meetings.map((meeting) => (
          // need to add code to print only the active meetings
          // based on state
          <MeetingCard meeting={meeting} />
        ))}
      </Stack>
    </>
  );
};

export default MeetingsList;
