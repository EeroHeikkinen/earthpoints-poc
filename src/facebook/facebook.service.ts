import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';

import * as dotenv from "dotenv";
import { response } from 'express';
dotenv.config();

@Injectable()
export class FacebookService {
    private token: string = process.env.FACEBOOK_ACCESS_TOKEN
    private apiUrl: string = 'https://graph.facebook.com/v12.0'

    constructor(
        private httpService: HttpService,
    ) {}

    async getQuery(query) {
        const source$ = this.httpService.get(this.apiUrl + '/' + query + '?access_token=' + this.token)
        return await lastValueFrom(source$)
    }

    async getUrl(url) {
        const source$ = this.httpService.get(url)
        return await lastValueFrom(source$)
    }

    async getFeed(facebookId) {
        var dataBuffer = await this.getQuery(facebookId + '/feed');
        if (!dataBuffer.data) {
            return null;
        }
        var data = dataBuffer.data.data;
        var maxPages = 10; 
        var donePages = 1;

        while(dataBuffer.data && dataBuffer.data.paging && dataBuffer.data.paging.next && donePages++ < maxPages) {
            const next = dataBuffer.data.paging.next;

            dataBuffer = await this.getUrl(next);
            if (!dataBuffer.data) {
                break;
            }

            data = data.concat(dataBuffer.data.data); 
        }

        return data;
    }
}
