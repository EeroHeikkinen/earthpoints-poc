require('dotenv').config()
import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookApiService } from 'src/facebook-api/facebook-api.service';
import { RuleService } from 'src/rule/rule.service';
import { IExtractor } from 'src/interfaces/extractor.interface';
import { PlatformConnection } from 'src/platform-connection/entities/platform-connection.entity';
import { User } from 'src/user/entities/user.entity';
import { IEmailTemplate } from 'src/interfaces/email-template.interface';
import { UserService } from 'src/user/user.service';
import moment from 'moment';
import { PointEventService } from 'src/point-event/point-event.service';
import { MECountries } from 'src/user/constants/MECountries';
import { EUCountries } from 'src/user/constants/EUCountries';

@Injectable()
export class WelcomeMessageEmailTemplate implements IEmailTemplate {
    constructor(
        private pointEventService: PointEventService
        ) {
    }

    getName() {
        return 'welcome-message'
    }

    getFullname() {
        return 'Welcome E-Mail'
    }

    async render(user:User, {hourInUserTimeZone, minutesInUserTimeZone, lastSent, contextTimestamp}:{hourInUserTimeZone: number, minutesInUserTimeZone: number, lastSent: Date, contextTimestamp: Date}) {
        const now = moment(contextTimestamp);

        // First time sending daily message
        if(lastSent) {
            return false;
        }

        //Send only to EU
        if(!EUCountries.includes(user.countryCode)){
            console.log(`Skipping sending welcome e-mail to out of EU countries! (${user.countryCode})`);
            return false;
        }
          
        return {
            template: 'welcome-message',
            subject: 'Welcome to Earth Points dashboard!',
            context: {
                firstName:user.firstName,
                footerImage: `${process.env.BASE_URL}/point-badge?point=${process.env.CONNECT_PLATFORM_POINTS}`,
                unsubscribeUrl: `${process.env.BASE_URL}/unsubscribe/${user.userid}`,
            }
        }
    }

}