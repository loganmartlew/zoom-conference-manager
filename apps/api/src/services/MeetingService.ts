import { MeetingDTO } from "@zoom-conference-manager/api-interfaces";
import Meeting from "../entities/Meeting";

export default class MeetingService {

    static async getOne(ubid: string) {
        const meeting = await Meeting.findOneBy({ ubid });
        if (!meeting) {
            throw new Error('Meeting not found');
        }

        return meeting;
    }
}