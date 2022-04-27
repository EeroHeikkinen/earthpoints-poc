import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class InstagramApiService {
  async getMedia(authToken: string, mediaId: string) {
    const dataBuffer = await this.getQuery(
      authToken,
      `${mediaId}?fields=media_url`,
    );
    return dataBuffer.data.media_url;
  }

  //private token: string = process.env.FACEBOOK_ACCESS_TOKEN
  private apiUrl: string = 'https://graph.instagram.com';

  constructor(private httpService: HttpService) {}

  async getQuery(authToken, query) {
    if (!query.includes('?')) {
      query += '?';
    } else {
      query += '&';
    }
    query += 'access_token=' + authToken;
    const requestUrl = this.apiUrl + '/' + query;
    console.log('Requesting IG with: ' + requestUrl);
    const source$ = this.httpService.get(requestUrl);
    return await lastValueFrom(source$);
  }

  async getUrl(url) {
    const source$ = this.httpService.get(url);
    return await lastValueFrom(source$);
  }

  async getFeed(
    authToken,
    {
      retrieveUntil = new Date(),
      retrieveFrom = new Date('2021-09-01T00:00:00'),
      maxPages = 5,
    },
  ) {
    let dateParams = `since=${Math.floor(retrieveFrom.getTime() / 1000)}`;
    if (retrieveUntil) {
      dateParams += `&until=${Math.floor(retrieveUntil.getTime() / 1000)}`;
    }
    let dataBuffer = await this.getQuery(
      authToken,
      `me/media?${dateParams}&fields=caption,media_type,permalink,media_url,timestamp`,
    );
    if (!dataBuffer.data) {
      return null;
    }
    const data = dataBuffer.data.data;

    let oldestTimestamp;
    if (
      dataBuffer.data.paging &&
      dataBuffer.data.paging.cursors &&
      dataBuffer.data.paging.cursors.after ==
        dataBuffer.data.paging.cursors.after
    ) {
      // No more results
      oldestTimestamp = retrieveFrom;
    } else {
      oldestTimestamp = new Date(data[data.length - 1].created_time);
    }

    return {
      items: data,
      retrievedFrom: oldestTimestamp,
      retrievedUntil: retrieveUntil,
    };
  }
}
