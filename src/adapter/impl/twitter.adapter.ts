import { TwitterApi } from 'twitter-api-v2';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { emit } from 'process';
import { RuleService } from 'src/rule/rule.service';
import { IPlatformAdapter } from 'src/interfaces/platform-adapter.interface';
import { SocialCredential } from 'src/social-credential/entities/social-credential.entity';

import * as dotenv from "dotenv";
import { response } from 'express';
dotenv.config();

@Injectable()
export class TwitterAdapter implements IPlatformAdapter {
    constructor(
        private ruleService: RuleService
        ){}

    async syncUser(credential: SocialCredential) {
        const userid = credential.userid;

        if(!credential.authToken || !credential.tokenSecret) {
            throw new HttpException('Misconfigured Twitter auth token', HttpStatus.INTERNAL_SERVER_ERROR);
        }
       /* const userClient = new TwitterApi({
            appKey: credential.authToken,
            appSecret: credential.tokenSecret,
            //accessToken: process.env.TWITTER_KEY,
            //accessSecret: process.env.TWITTER_SECRET
        });*/

        const appOnlyClient = new TwitterApi( process.env.TWITTER_BEARER );

        const roClient = appOnlyClient.readOnly;

       // const tweets = await roClient.v2.userTimeline(credential.profileId, { exclude: 'replies' });
       let tweets;
       try {
       tweets = await roClient.v2.userTimeline(credential.profileId, { 
           'tweet.fields': ['created_at', 'text', 'attachments', 'author_id', 'id', 'entities'],
           'user.fields': ['id','name','profile_image_url','url','username'],
           'expansions': ['referenced_tweets.id', 'referenced_tweets.id.author_id', 'entities.mentions.username', 'in_reply_to_user_id', 'attachments.media_keys'],
           'media.fields': ['preview_image_url', 'type', 'url'],
           exclude: 'replies' 
        });
       } catch(err) {
           console.log(err);
       }
        //const tweets = userTimeline.tweets;
        
        for(const tweet of tweets) {
            console.log(tweet);
            if(tweet.created_at) {
                tweet.timestamp = new Date(tweet.created_at)
            }
            if(tweet.referenced_tweets && tweet.referenced_tweets.length && tweet.referenced_tweets[0].type == 'retweeted') {
                const referencedId = tweet.referenced_tweets[0].id;
                let augmentedText = tweet.text;
                for(const referencedTweet of tweets.includes.tweets) {
                    if(referencedTweet.id == referencedId) {
                        augmentedText += " ";
                        augmentedText += referencedTweet.text; 
                        await this.ruleService.trigger('user.published.share', { 'userid': userid, 'platform': 'twitter', message: augmentedText, data: tweet })
                    }
                }
            } else {
                await this.ruleService.trigger('user.published.post', {  'userid': userid, 'platform': 'twitter', message: tweet.text, data: tweet })
            }
        }  
    }  
}