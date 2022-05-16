import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class FacebookApiService {
  private readonly logger = new Logger(FacebookApiService.name);
  private apiUrl = 'https://graph.facebook.com/v12.0';

  constructor(private httpService: HttpService) {}

  async getQuery(authToken, query) {
    //this.logger.debug("Retrieving Query: " + query)
    if (!query.includes('?')) {
      query += '?';
    } else {
      query += '&';
    }
    query += 'access_token=' + authToken;
    try {
      const source$ = this.httpService.get(this.apiUrl + '/' + query);
      return await lastValueFrom(source$);
    } catch (err) {
      console.log(`Failed while retrieving query: ${query}: ${err}`);
    }
  }

  async getUrl(url) {
    //this.logger.debug("Retrieving URL: " + url)
    const source$ = this.httpService.get(url);
    return await lastValueFrom(source$);
  }

  async getFeed(
    authToken: string,
    facebookId: string,
    {
      retrieveUntil = new Date(),
      retrieveFrom = new Date('2021-09-01T00:00:00'),
      maxPages = 5,
    }: { retrieveUntil?: Date; retrieveFrom?: Date; maxPages?: number } = {},
  ): Promise<{ items: any; retrievedFrom: Date; retrievedUntil: Date }> {
    let dateParams = `since=${Math.floor(retrieveFrom.getTime() / 1000)}`;
    if (retrieveUntil) {
      dateParams += `&until=${Math.floor(retrieveUntil.getTime() / 1000)}`;
    }
    let dataBuffer = await this.getQuery(
      authToken,
      `${facebookId}/feed?${dateParams}&fields=status_type,message,description,created_time,shares`,
    );
    if (!dataBuffer.data) {
      return null;
    }
    let data = dataBuffer.data.data;
    let donePages = 1;

    while (
      dataBuffer.data &&
      dataBuffer.data.paging &&
      dataBuffer.data.paging.next
    ) {
      if (donePages++ >= maxPages) {
        // hit max page limit
        const oldestTimestamp = new Date(data[data.length - 1].created_time);
        return {
          items: data,
          retrievedFrom: oldestTimestamp,
          retrievedUntil: retrieveUntil,
        };
      }
      const next = dataBuffer.data.paging.next;

      dataBuffer = await this.getUrl(next);
      if (!dataBuffer.data.length) {
        break;
      }

      data = data.concat(dataBuffer.data.data);
    }

    return {
      items: data,
      retrievedFrom: retrieveFrom,
      retrievedUntil: retrieveUntil,
    };
  }
}
