import { TwitterApi } from 'twitter-api-v2';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RuleService } from 'src/rule/rule.service';
import { IExtractor } from 'src/interfaces/extractor.interface';
import { PlatformConnection } from 'src/platform-connection/entities/platform-connection.entity';

import * as dotenv from "dotenv";

dotenv.config();

/*
!!!

this is a test commit to extract likes from twitter.
-It is not suitable to use this because likes endpoint (userLikedTweets) does not accept 
start end date date. So it retreived all likes. which will evantually hit the 
rate limit.

*/

@Injectable()
export class TwitterLikesExtractor implements IExtractor {
    constructor(
        private ruleService: RuleService
        ){}

    private maxTweetsPerUpdate:number = 300;

    async process(credential: PlatformConnection, {from, until}) {
        const userid = credential.userid;

        if(!credential.authToken || !credential.tokenSecret) {
            throw new HttpException('Misconfigured Twitter auth token', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const userClient = new TwitterApi({
            appKey: process.env.TWITTER_KEY,
            appSecret: process.env.TWITTER_SECRET,
            accessToken: credential.authToken,
            accessSecret: credential.tokenSecret,
          });

        const appOnlyClient = await userClient.appLogin();

        // const appOnlyClient = new TwitterApi( process.env.TWITTER_BEARER );
        const roClient = appOnlyClient.readOnly;
        
        // const tweets = await roClient.v2.userTimeline(credential.profileId, { exclude: 'replies' });
        let timeline;
        try {
            timeline = await roClient.v2.userLikedTweets(credential.profileId, { 
                'tweet.fields': ['created_at', 'text', 'attachments', 'author_id', 'id', 'entities'],
                'user.fields': ['id','name','profile_image_url','url','username'],
                'expansions': ['referenced_tweets.id', 'referenced_tweets.id.author_id', 'entities.mentions.username', 'in_reply_to_user_id', 'attachments.media_keys'],
                'media.fields': ['preview_image_url', 'type', 'url'],
                'max_results': 100,
            });
        } catch(err) {
            console.log(err);
        }
        
        let currentPage = timeline;
        let numberRetrieved = 0;

        while (true) {
            let latestTimestamp;
            for(const tweet of currentPage) {
                console.log(tweet);
                if(tweet.created_at) {
                    tweet.timestamp = new Date(tweet.created_at)
                    // Instead of filtering the tweets according to date we filter out
                    // And has to loop all tweets every time. Should not be used like this.
                    if(tweet.timestamp < from || tweet.timestamp > until){
                        continue;
                    }
                    //-----
                    if(tweet.timestamp < latestTimestamp) {
                        latestTimestamp = tweet.timestamp;
                    }
                }
                await this.ruleService.trigger('user.published.share', {  'userid': userid, 'platform': 'twitter', message: tweet.text, data: tweet })
            }

            if(currentPage.done) {
                // Finished processing - we covered the entire range
                return { processedFrom: from, processedUntil: until }
            }

            numberRetrieved += currentPage.tweets.length;
            if((numberRetrieved+100) > this.maxTweetsPerUpdate) {
                // Hitting rate limit - let's wrap up here and note to continue next time
                return { processedFrom: latestTimestamp, processedUntil: until } 
            }

            // Otherwise, let's go through next page of results
            currentPage = await currentPage.next()
        }     
    }  
}