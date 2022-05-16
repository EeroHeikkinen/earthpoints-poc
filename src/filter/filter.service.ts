import { Injectable } from '@nestjs/common';
import { BaseFilter } from './impl/base.filter';
import { ContentTypeFilter } from './impl/content-type.filter';
import { HashtagsFilter } from './impl/hashtags.filter';
import { MatchCountFilter } from './impl/match-count.filter';
import { MessageFilter } from './impl/message.filter';
import { PlatformFilter } from './impl/platform.filter';

@Injectable()
export class FilterService {
  getFilter(name: string) {
    if (name == 'content_type') return new ContentTypeFilter();
    if (name == 'hashtags') return new HashtagsFilter();
    if (name == 'match_count') return new MatchCountFilter();
    if (name == 'platform') return new PlatformFilter();
    if (name == 'message') return new MessageFilter();
  }
}
