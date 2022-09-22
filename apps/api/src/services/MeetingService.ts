/* eslint-disable import/no-cycle */
import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { formats } from '@zoom-conference-manager/dates';
import dayjs from 'dayjs';
import Meeting from '../entities/Meeting';
import EventService from './EventService';
import ZoomService from './ZoomService';

export default class MeetingService {
  static async getAll() {
    const meetings = await Meeting.find();
    return meetings;
  }

  static async getOne(id: string) {
    const meeting = await Meeting.findOneBy({ id });
    if (!meeting) {
      throw new Error('Meeting not found');
    }

    return meeting;
  }

  static async create(meetingData: MeetingDTO) {
    const event = await EventService.getOne(meetingData.eventId);

    const meetingStub = await Meeting.create();

    if (!meetingStub) {
      throw new Error('Unable to create Meeting');
    }

    meetingStub.name = meetingData.name;
    meetingStub.startDateTime = dayjs(
      meetingData.startDateTime,
      formats.dateTime
    ).toDate();
    meetingStub.endDateTime = dayjs(
      meetingData.endDateTime,
      formats.dateTime
    ).toDate();
    meetingStub.zoomId = '';
    meetingStub.event = event;

    const meeting = await meetingStub.save();
    return meeting;
  }

  static async setZoomId(meetingId: string, zoomId: string) {
    const meeting = await Meeting.findOneBy({ id: meetingId });
    if (!meeting) {
      throw new Error('Meeting not found');
    }

    try {
      meeting.zoomId = zoomId;
      await meeting.save();
      return meeting;
    } catch (error) {
      throw new Error('Unable to set Meetings Zoom id');
    }
  }

  static async update(id: string, meetingData: MeetingDTO) {
    const meeting = await this.getOne(id);

    meeting.name = meetingData.name;
    meeting.startDateTime = dayjs(
      meetingData.startDateTime,
      formats.dateTime
    ).toDate();
    meeting.endDateTime = dayjs(
      meetingData.endDateTime,
      formats.dateTime
    ).toDate();

    const updatedMeeting = await meeting.save();
    return updatedMeeting;
  }

  static async delete(id: string) {
    const meeting = await this.getOne(id);

    await ZoomService.deleteMeeting(meeting);

    const result = await Meeting.delete(id);
    if (!result.affected) return false;
    return result.affected > 0;
  }
}
