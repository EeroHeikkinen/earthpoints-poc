import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookApiService } from 'src/facebook-api/facebook-api.service';
import { RuleService } from 'src/rule/rule.service';
import { IExtractor } from 'src/interfaces/extractor.interface';
import { PlatformConnection } from 'src/platform-connection/entities/platform-connection.entity';
import { InstagramApiService } from 'src/instagram-api/instagram-api.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class InstagramExtractor implements IExtractor {
  constructor(
    private instagramService: InstagramApiService,
    private ruleService: RuleService,
  ) {}

  async process(
    credential: PlatformConnection,
    { from, until }: { from: Date; until: Date },
    user: User,
  ) {
    const {
      items: feedContent,
      retrievedFrom,
      retrievedUntil,
    } = await this.instagramService.getFeed(credential.authToken, {
      retrieveFrom: from,
      retrieveUntil: until,
    });
    const userid = credential.userid;

    for (const item of feedContent) {
      if (item.timestamp) {
        item.timestamp = new Date(item.timestamp);
      }
      await this.ruleService.trigger('user.published.post', {
        userid: userid,
        user,
        platform: 'instagram',
        message: item.caption,
        data: item,
        imageDownloader: async () => {
          return await this.instagramService.getMedia(
            credential.authToken,
            item.id,
          );
        },
      });
    }

    return { processedFrom: undefined, processedUntil: undefined };
  }
}
