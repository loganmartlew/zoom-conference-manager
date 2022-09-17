interface Meeting {
  name: string;
  date: string;
  time: string;
  endDateTime: string;
  event: string;
}

// Note this adheres more to sending the meeting
// data to the backend.
interface MeetingData {
  id: string;
  name: string;
  startDateTime: string;
  endDateTime: string;
}

interface UpdateValue {
  name: string;
  date: string;
  time: string;
  endDateTime: string;
}

interface UpdateEdit {
  name: boolean;
  date: boolean;
  time: boolean;
  endDateTime: boolean;
}

interface UpdateState {
  value: UpdateValue;
  edit: UpdateEdit;
}

enum UpdateMeetingType {
  SET = 'SET',
  EDIT = 'EDIT',
  INITIALIZE = 'INITIALIZE',
}

interface UpdateAction {
  type: UpdateMeetingType;
  payload: string;
  name: keyof Meeting | null;
}

export {
  Meeting,
  MeetingData,
  UpdateValue,
  UpdateEdit,
  UpdateState,
  UpdateMeetingType,
  UpdateAction,
};
