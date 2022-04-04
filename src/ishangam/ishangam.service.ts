import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

const got = require('got');
const moment = require('moment');

@Injectable()
export class IshangamService {

    constructor() {}


    async addNonCrmContact(user: User, timestamp: Date) {
        const toPost = {
            "name": user.firstName,
            "email":user.email,
            "list_identifier":"Earth Points",
            "country":"IN", // TODO: change it when country branch is merged
            "language":"en",
            "subs_id":1,
            "system_id":74,
            "dynamic_data":"true",
            "dynamic_dt_field_1": moment(timestamp).format('YYYY-MM-DD'),
            "dynamic_int_field_1": user.pointsEarnedToday,
            "dynamic_int_field_2": user.points,
            "dynamic_field_1" : "Frist action", // first action in EP
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
