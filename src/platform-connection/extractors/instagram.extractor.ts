import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookApiService } from 'src/facebook-api/facebook-api.service';
import { RuleService } from 'src/rule/rule.service';
import { IExtractor } from 'src/interfaces/extractor.interface';
import { PlatformConnection } from 'src/platform-connection/entities/platform-connection.entity';
import { InstagramApiService } from 'src/instagram-api/instagram-api.service';

@Injectable()
export class InstagramExtractor implements IExtractor {
    constructor(
        private instagramService: InstagramApiService,
        private ruleService: RuleService
        ){}

        async process(credential: PlatformConnection, {from, until}) {
            const feedContent = await this.instagramService.getFeed(credential.authToken);
            const userid = credential.userid;
    
            for(const item of feedContent) {
                if(item.timestamp) {
                    item.timestamp = new Date(item.timestamp)
                }
                await this.ruleService.trigger('user.published.post', { 'userid': userid, 'platform': 'instagram', message: item.caption, data: item } );
            }  

            return { processedFrom: undefined, processedUntil: undefined }
        }
}