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

@Injectable()
export class DailyMessageEmailTemplate implements IEmailTemplate {
    constructor(
        private pointEventService: PointEventService
        ) {
    }

    getName() {
        return 'daily-message'
    }

    async render(user:User, {hourInUserTimeZone, minutesInUserTimeZone, lastSent, contextTimestamp}:{hourInUserTimeZone: number, minutesInUserTimeZone: number, lastSent: Date, contextTimestamp: Date}) {
        const now = moment(contextTimestamp);

        // First time sending daily message
        if(!lastSent) {
            const userRegistered = moment(user.createdAt);
            const durationSinceRegistered = moment.duration(now.diff(userRegistered));

            // Don't send a daily message within N hours of registration
            if(false && durationSinceRegistered.asHours() < parseInt(process.env.HOURS_UNTIL_FIRST_DAILY_EMAIL)) {
                console.log("Too soon after registration to send daily msg")
                return false;
            }
        } else {
            // Already sent daily message before
            const last = moment(lastSent);
            const durationSinceLastEmail = moment.duration(now.diff(last));
            // Don't send new emails if less than 23 hours has passed since last
            // 23 hours because otherwise if last email was sent at 12:05 and we now run at 12:00
            // the difference would be something like 23.995
            if(durationSinceLastEmail.asHours() < 23) {
                console.log("Already sent daily email less than 23 hours ago")
                return false;
            }
        }

        const oneDayAgo=now.subtract(1,"day").toDate()
        const events = await this.pointEventService.findAllForUser(user.userid);
        const highestDay = 5;
        const pointsEarnedToday = user.events
            .filter((event)=>{ return event.timestamp > oneDayAgo })
            .map((event) => event.points)
            .reduce((previous, current) => previous + current, 0)

        /*if(pointsEarnedToday > highestDay) {            
            // Percentile of people
        }*/

        if(hourInUserTimeZone != 12
             ) {
            console.log("Wrong local time to send daily msg")
            return false;
        }
        
        return {
            template: 'daily-message',
            subject: 'Earth Points Dashboard: you have ' + user.points + " Earth Points!",
            context: {
                points:user.points, 
                pointsEarnedToday, 
                firstName:user.firstName,
                footerImage: `${process.env.BASE_URL}/point-badge?point=${pointsEarnedToday}&total=${user.points}`
            }
        }
    }

}