interface Meeting {
  name: string;
  date: string;
  time: string;
  duration: string;
  event: string;
}

interface UpdateValue {
  name: string;
  date: string;
  time: string;
  duration: string;
  event: string;
}

interface UpdateEdit {
  name: boolean;
  date: boolean;
  time: boolean;
  duration: boolean;
  event: boolean;
}

interface UpdateError {
  name: boolean;
  date: boolean;
  time: boolean;
  duration: boolean;
  event: boolean;
}

interface UpdateState {
  value: UpdateValue;
  edit: UpdateEdit;
  error: UpdateError;
}

enum UpdateMeetingType {
  SET = 'SET',
  EDIT = 'EDIT',
  ERR = 'ERR',
}

interface UpdateAction {
  type: UpdateMeetingType;
  payload: string;
  name: string;
}

export {
  Meeting,
  UpdateValue,
  UpdateEdit,
  UpdateError,
  UpdateState,
  UpdateMeetingType,
  UpdateAction,
};
