import { User } from "src/user/entities/user.entity";

export interface IEmailTemplate {
    render: (user:User, {hourInUserTimeZone, minutesInUserTimeZone, contextTimestamp, lastSent}:{hourInUserTimeZone:number, minutesInUserTimeZone:number, contextTimestamp:Date, lastSent:Date}) => Promise<false | {text?: string, databaseTemplate?: string, html?: string, template?: string, context?: any, subject?: string}>;

    getName: () => string;

    getFullname: () => string;
}