/* eslint-disable import/no-cycle */
import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { formats } from '@zoom-conference-manager/dates';
import dayjs from 'dayjs';
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
    meetingStub.startDateTime = dayjs(
      meetingData.startDateTime,
      formats.dateTime
    ).toDate();
    meetingStub.duration = meetingData.duration;
    meetingStub.event = event;

    try {
      const meeting = await meetingStub.save();
      return meeting;
    } catch (error) {
      throw new Error('Unable to save Meeting');
    }
  }

  static async update(id: string, meetingData: MeetingDTO): Promise<Meeting> {
    try {
      const meeting = await this.getOne(id);

      meeting.name = meetingData.name;
      meeting.startDateTime = dayjs(
        meetingData.startDateTime,
        formats.dateTime
      ).toDate();
      meeting.duration = meetingData.duration;

      // TODO : Update meeting.event prop?

      const updatedMeeting = await meeting.save();

      return updatedMeeting;
    } catch (error) {
      throw new Error('Unable to update Meeting');
    }
  }
}
