import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class InstagramApiService {
    //private token: string = process.env.FACEBOOK_ACCESS_TOKEN
    private apiUrl: string = 'https://graph.instagram.com'

    constructor(
        private httpService: HttpService,
    ) {}

    async getQuery(authToken, query) {
        if(!query.includes('?')) {
            query += '?';
        } else {
            query += '&'
        }
        query += 'access_token=' + authToken;
        const requestUrl = this.apiUrl + '/' + query;
        console.log("Requesting IG with: " + requestUrl)
        const source$ = this.httpService.get(requestUrl)
        return await lastValueFrom(source$)
    }

    async getUrl(url) {
        const source$ = this.httpService.get(url)
        return await lastValueFrom(source$)
    }

    async getFeed(authToken) {
        var dataBuffer = await this.getQuery(authToken, 'me/media?fields=caption,media_type,permalink,media_url,timestamp');
        if (!dataBuffer.data) {
            return null;
        }
        var data = dataBuffer.data.data;

        return data;
        /*
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

        return data;*/
    }
}
