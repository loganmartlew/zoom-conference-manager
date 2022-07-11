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
  SET_UBID = 'SET_UBID',
  SET_NAME = 'SET_NAME',
  SET_DATE = 'SET_DATE',
  SET_TIME = 'SET_TIME',
  SET_DURATION = 'SET_DURATION',
  SET_EVENT = 'SET_EVENT',
  EDIT_UBID = 'EDIT_UBID',
  EDIT_NAME = 'EDIT_NAME',
  EDIT_DATE = 'EDIT_DATE',
  EDIT_TIME = 'EDIT_TIME',
  EDIT_DURATION = 'EDIT_DURATION',
  EDIT_EVENT = 'EDIT_EVENT',
  ERR_UBID = 'ERR_UBID',
  ERR_NAME = 'ERR_NAME',
  ERR_DATE = 'ERR_DATE',
  ERR_TIME = 'ERR_TIME',
  ERR_DURATION = 'ERR_DURATION',
  ERR_EVENT = 'ERR_EVENT',
}

interface UpdateAction {
  type: UpdateMeetingType;
  payload: string;
}

export {
  UpdateValue,
  UpdateEdit,
  UpdateError,
  UpdateState,
  UpdateMeetingType,
  UpdateAction,
};
