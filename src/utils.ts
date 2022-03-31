import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

const moment = require('moment');
const countries = require("i18n-iso-countries");

export default class Utils {
      static MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      static getFormattedDate(date, prefomattedDate:Boolean|string = false, hideYear = false, timezone = 'UTC') {
        //const day = date.getDate();
        //const month = Utils.MONTH_NAMES[date.getMonth()];
        //const year = date.getFullYear();
        //const hours = date.getHours();
        //let minutes = date.getMinutes();

        //if (minutes < 10) {
          // Adding leading zero to minutes
        //  minutes = `0${ minutes }`;
        //}

        if(timezone == undefined)
          timezone = 'UTC';
      
        if (prefomattedDate) {
          // Today at 10:20
          // Yesterday at 10:20
          return moment(date).tz(timezone).format(`[${ prefomattedDate }] [a]t H:mm`);
          //return `${ prefomattedDate } at ${ hours }:${ minutes }`;
        }
      
        if (hideYear) {
          // 10. January at 10:20
          return moment(date).tz(timezone).format('D. MMMM [a]t H:mm');
          //return `${ day }. ${ month } at ${ hours }:${ minutes }`;
        }
      
        // 10. January 2017. at 10:20
        return moment(date).tz(timezone).format('D. MMMM YYYY. [a]t H:mm');
        //return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`;
      }
      
      static timeAgo(dateParam, timezone = 'UTC') {
        if (!dateParam) {
          return null;
        }
      
        const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
        const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
        const today = new Date();
        const yesterday = new Date(today.valueOf() - DAY_IN_MS);
        const seconds = Math.round((today.valueOf() - date) / 1000);
        const minutes = Math.round(seconds / 60);
        const isToday = today.toDateString() === date.toDateString();
        const isYesterday = yesterday.toDateString() === date.toDateString();
        const isThisYear = today.getFullYear() === date.getFullYear();
      
      
        if (seconds < 5) {
          return 'now';
        } else if (seconds < 60) {
          return `${ seconds } seconds ago`;
        } else if (seconds < 90) {
          return 'about a minute ago';
        } else if (minutes < 60) {
          return `${ minutes } minutes ago`;
        } else if (isToday) {
          return Utils.getFormattedDate(date, 'Today',false, timezone); // Today at 10:20
        } else if (isYesterday) {
          return Utils.getFormattedDate(date, 'Yesterday',false, timezone); // Yesterday at 10:20
        } else if (isThisYear) {
          return Utils.getFormattedDate(date, false, true, timezone); // 10. January at 10:20
        }
      
        return Utils.getFormattedDate(date, false, false, timezone); // 10. January 2017. at 10:20
      }


      static IsTimezone(validationOptions?: ValidationOptions) {
        const defaultValidationOptions: ValidationOptions = {...validationOptions};
        if(!defaultValidationOptions.message)
          defaultValidationOptions.message = "Invalid timezone";
        return function (object: Object, propertyName: string) {
          registerDecorator({
            name: 'isTimezone',
            target: object.constructor,
            propertyName: propertyName,
            options: defaultValidationOptions,            
            validator: {
              validate(value: any, args: ValidationArguments) {
                return moment.tz.zone(value);
              },
            },
          });
        };
      }

      static IsCountryCode(validationOptions?: ValidationOptions) {
        const defaultValidationOptions: ValidationOptions = {...validationOptions};
        if(!defaultValidationOptions.message)
          defaultValidationOptions.message = "Invalid countryCode";
        return function (object: Object, propertyName: string) {
          registerDecorator({
            name: 'isCountryCode',
            target: object.constructor,
            propertyName: propertyName,
            options: defaultValidationOptions,            
            validator: {
              validate(value: any, args: ValidationArguments) {
                return countries.isValid(value);
              },
            },
          });
        };
      }

}