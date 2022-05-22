/* eslint-disable import/no-cycle */
import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import Meeting from '../entities/Meeting';
import EventService from './EventService';

export default class MeetingService {
  static async getAll() {
    const meetings = await Meeting.find();
    return meetings;
  }

  static async getOne(ubid: string) {
    const meeting = await Meeting.findOneBy({ ubid });
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

    meetingStub.ubid = meetingData.ubid;
    meetingStub.name = meetingData.name;
    meetingStub.startDateTime = meetingData.startDateTime;
    meetingStub.duration = meetingData.duration;
    meetingStub.event = event;

    try {
      const meeting = await meetingStub.save();
      return meeting;
    } catch (error) {
      throw new Error('Unable to save Meeting');
    }
  }
}