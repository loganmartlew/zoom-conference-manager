import { yupResolver } from '@hookform/resolvers/yup';

export interface IFormInput {
  name: string;
  startDateTime: Date;
  endDateTime: Date;
  presenter: string;
  presEmail: string;
  rehearsalId: string;
}
