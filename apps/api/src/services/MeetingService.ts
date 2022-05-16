import { MeetingDTO } from "@zoom-conference-manager/api-interfaces";
import Meeting from "../entities/Meeting";

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
        const meetingStub = await Meeting.create({ ...meetingData });

        if (!meetingStub) {
            throw new Error('Unable to create Meeting');
        }

        try {
            const meeting = await meetingStub.save();
            return meeting;
        } catch (error) {
            throw new Error('Unable to save Meeting');
        }
    }
}