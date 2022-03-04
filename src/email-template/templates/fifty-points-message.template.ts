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

@Injectable()
export class FiftyPointsEmailTemplate implements IEmailTemplate {
    getName() {
        return 'fifty-points';
    }
    
    async render(user:User, {hourInUserTimeZone, minutesInUserTimeZone, lastSent, contextTimestamp}:{hourInUserTimeZone: number, minutesInUserTimeZone: number, lastSent: Date, contextTimestamp: Date}) {
        if(user.points < 50 || lastSent) {
            return false;
        }
        
        return {
            template: 'fifty-points',
            subject: 'You have reached 50 Earth Points!',
            context: {
                numPointsReached: 50,
                firstName: user.firstName
            }
        }
    }
}