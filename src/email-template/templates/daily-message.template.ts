require('dotenv').config()
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { IEmailTemplate } from 'src/interfaces/email-template.interface';
import moment from 'moment';
import { PointEventService } from 'src/point-event/point-event.service';
import { MECountries } from 'src/user/constants/MECountries';
import { EUCountries } from 'src/user/constants/EUCountries';

@Injectable()
export class DailyMessageEmailTemplate implements IEmailTemplate {
  getName() {
    return 'daily-message';
  }

  getFullname() {
    return 'Daily Digest Trending E-Mails';
  }


  async render(
    user: User,
    {
      hourInUserTimeZone,
      lastSent,
      contextTimestamp,
    }: {
      hourInUserTimeZone: number;
      minutesInUserTimeZone: number;
      lastSent: Date;
      contextTimestamp: Date;
    },
  ) {
    const now = moment(contextTimestamp);

    //Send only to EU
    if(!EUCountries.includes(user.countryCode)){
      console.log(`Skipping sending daily e-mail to out of EU countries! (${user.countryCode})`);
      return false;
    }
    
    // First time sending daily message
    if (!lastSent) {
      const userRegistered = moment(user.createdAt);
      const durationSinceRegistered = moment.duration(now.diff(userRegistered));

      // Don't send a daily message within N hours of registration
      if (
        durationSinceRegistered.asHours() <
          parseInt(process.env.HOURS_UNTIL_FIRST_DAILY_EMAIL)
      ) {
        console.log('Too soon after registration to send daily msg');
        return false;
      }
    } else {
      // Already sent daily message before
      const last = moment(lastSent);
      const durationSinceLastEmail = moment.duration(now.diff(last));
      // Don't send new emails if less than 12 hours has passed since last
      if (durationSinceLastEmail.asHours() < 12) {
        console.log('Already sent daily email less than 12 hours ago');
        return false;
      }
    }

    const pointsEarnedToday = user.pointsEarnedToday;

    if (hourInUserTimeZone != (process.env.DAILY_EMAIL_HOUR_IN_USER_TIMEZONE || 20)) {
      console.log('Wrong local time to send daily msg');
      return false;
    }

    if (!user.points || user.points == 0) {
      console.error('User ' + user.userid + ' has no points');
      return false;
    }

    let prefix;
    if (!pointsEarnedToday || pointsEarnedToday == 0) {
      prefix = 'no-points-daily';
    } else {
      prefix = 'daily';
    }

    const databaseTemplate =
      prefix +
      '-' +
      contextTimestamp.getFullYear() +
      '-' +
      (contextTimestamp.getMonth() + 1) +
      '-' +
      contextTimestamp.getDate();

    return {
      databaseTemplate,
      subject:
        'Earth Points Dashboard: you have ' + user.points + ' Earth Points!',
      context: {
        points: user.points,
        pointsEarnedToday,
        firstName: user.firstName,
        footerImage: `${process.env.BASE_URL}/point-badge?point=${pointsEarnedToday}&total=${user.points}&confetti=2&theme=bluered_bottom`,
        unsubscribeUrl: `${process.env.BASE_URL}/unsubscribe/${user.userid}`,
      },
    };
  }
}
