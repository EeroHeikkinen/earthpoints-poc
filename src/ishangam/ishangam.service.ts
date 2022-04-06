import { Injectable } from '@nestjs/common';
import { PointEventService } from 'src/point-event/point-event.service';
import { User } from 'src/user/entities/user.entity';

const got = require('got');
const moment = require('moment');

@Injectable()
export class IshangamService {

    constructor(
        private pointEventService: PointEventService
    ) {}


    async addNonCrmContact(user: User, timestamp: Date) {

        if(user.countryCode != 'IN') {
            console.log(`ishangam warning: user countryCode is not IN (${user.countryCode})`);
            return null;
        }

        const events = await this.pointEventService.findAllForUser(user.userid);
        if(!events.length){
            console.log(`ishangam error: no event found for user: ${user.userid}`);
            return null;
        }
        events.sort((a, b) =>+b.timestamp - +a.timestamp)
        
        const toPost = {
            "name": user.firstName,
            "email":user.email,
            "list_identifier":"Earth Points",
            "country": user.countryCode,
            "language":"en",
            "subs_id":process.env.ISHANGAM_SUBS_ID,
            "system_id":74,
            "dynamic_data":"true",
            "dynamic_dt_field_1": moment(timestamp).format('YYYY-MM-DD'),
            "dynamic_int_field_1": user.pointsEarnedToday,
            "dynamic_int_field_2": user.points,
            "dynamic_field_1" : `${events[0].verb} ${events[0].platform}`, // first action in EP
            "dynamic_field_2" : "false", // send welcome message
            "dynamic_field_3" : "", // dynamic content
            "dynamic_field_4" : "1", // communication frequency
            "dynamic_field_5": user.userid,
            "additional_id_field":"dynamic_field_5",
            "dynamic_field_6": user.timezone
        }
        const data = await got.post(`${process.env.ISHANGAM_BASE_URL}/isha_mailing/add_non_crm_contact`, {
            headers: {
                "Authorization": `Bearer ${process.env.ISHANGAM_TOKEN}`
            },
            responseType: "json",
            json: toPost
        });

        if(!(data.body.result && data.body.result.status && data.body.result.status === 'Success')){
            console.log("ishangam error:");
            console.log(toPost);
            console.log(data.body);
        }
        return data.body;
    }

}
