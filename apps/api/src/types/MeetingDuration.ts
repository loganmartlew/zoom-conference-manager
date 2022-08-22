import Meeting from '../entities/Meeting';
import { Duration } from './Duration';

export interface MeetingDuration {
  meeting: Meeting;
  duration: Duration;
}
