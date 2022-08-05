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
}

interface UpdateEdit {
  name: boolean;
  date: boolean;
  time: boolean;
  duration: boolean;
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
  UpdateValue,
  UpdateEdit,
  UpdateState,
  UpdateMeetingType,
  UpdateAction,
};
