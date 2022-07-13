interface UpdateValue {
  ubid: string;
  name: string;
  date: string;
  time: string;
  duration: string;
  event: string;
}

interface UpdateEdit {
  ubid: boolean;
  name: boolean;
  date: boolean;
  time: boolean;
  duration: boolean;
  event: boolean;
}

interface UpdateError {
  ubid: boolean;
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
  UpdateValue,
  UpdateEdit,
  UpdateError,
  UpdateState,
  UpdateMeetingType,
  UpdateAction,
};
