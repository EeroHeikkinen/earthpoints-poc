require('dotenv').config();
import { Injectable } from '@nestjs/common';
import { IEmailTemplate } from 'src/interfaces/email-template.interface';
import { User } from 'src/user/entities/user.entity';
import { DailyMessageEmailTemplate } from './templates/daily-message.template';
import { MailerService } from '@nestjs-modules/mailer';
import { SentEmailRepository } from './sent-email.repository';
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
import { FiftyPointsEmailTemplate } from './templates/fifty-points-message.template';

@Injectable()
export class EmailTemplateService {
    templates: Map<string, IEmailTemplate>;
    constructor(
        private dailyMessageEmailTemplate: DailyMessageEmailTemplate,
        private fiftyPointsEmailTemplate: FiftyPointsEmailTemplate,
        private sentEmailRepository: SentEmailRepository,
        private readonly mailerService: MailerService
        ) {
        this.templates = new Map<string, IEmailTemplate>(Object.entries({
            'dailyMessage': dailyMessageEmailTemplate,
            'fiftyPoints': fiftyPointsEmailTemplate
        }))
    }

    async findAll() {
        return this.templates;
    }

    getFrom() {
        return process.env.EMAIL_FROM;
    }

    async processScheduled(user:User, timestamp:Date) {
        /* Let's get the current time in user's local timezone */
        const timezone = user.timezone || 'Asia/Kolkata';
        let formatter = new Intl.DateTimeFormat('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', timeZone: timezone });   
        const parts = formatter.formatToParts(timestamp)
        let hourInUserTimeZone:number, minutesInUserTimeZone:number;
        for(const part of parts) {
            if(part.type == 'hour') {
                hourInUserTimeZone = parseInt(part.value);
            }
            if(part.type == 'minute') {
                minutesInUserTimeZone = parseInt(part.value);
            }
        }

        for(const template of this.templates.values()) {
            const templateName = template.getName();
            const lastSent = await this.sentEmailRepository.getSentEmailByUserAndTemplateName(user.userid, templateName);
            
            const renderParams = await template.render(user, { 
                hourInUserTimeZone, 
                minutesInUserTimeZone, 
                contextTimestamp: timestamp, 
                lastSent: (lastSent && lastSent.length) ? lastSent[0].timestamp: undefined
            });

            if(renderParams) {
                await this
                    .mailerService
                    .sendMail({
                        to: user.email,
                        from: this.getFrom(),
                        ...renderParams
                    })
                    .then((success) => {
                        console.log(success)
                    })
                    .catch((err) => {
                        console.log(err)
                    });

                await this.sentEmailRepository.addSentEmail({
                    userid: user.userid,
                    template: templateName,
                    timestamp: new Date()
                })
            }
        }
    }
}
