import { Injectable, Logger } from '@nestjs/common';
import process from 'process';
import { IExtractor } from 'src/interfaces/extractor.interface';
import { CreatePlatformConnectionDto } from './dto/create-platform-connection.dto';
import { UpdatePlatformConnectionDto } from './dto/update-platform-connection.dto';
import { FacebookExtractor } from './extractors/facebook.extractor';
import { InstagramExtractor } from './extractors/instagram.extractor';
import { TwitterExtractor } from './extractors/twitter.extractor';
import { PlatformConnectionRepository } from './platform-connection.repository';

@Injectable()
export class PlatformConnectionService {
  private readonly logger = new Logger(PlatformConnectionService.name);
  private extractors: { facebook: FacebookExtractor; instagram: InstagramExtractor; twitter: TwitterExtractor; };
  
  async findByUserId(userid: any) {
    return await this.repository.findByUserId(userid);
  }

  async findByProfileIdAndPlatform(profileid: string, platform: string) {
    return await this.repository.findByProfileIdAndPlatform(profileid, platform)
  }
  constructor(
    private readonly repository: PlatformConnectionRepository,
    private facebookExtractor: FacebookExtractor,
    private instagramExtractor: InstagramExtractor,
    private twitterExtractor: TwitterExtractor,
    ) {
      this.extractors = {
        'facebook': facebookExtractor,
        'instagram': instagramExtractor,
        'twitter': twitterExtractor
      }
    }

  async create(createSocialCredentialDto: CreatePlatformConnectionDto) {
    return await this.repository.addPlatformConnection(createSocialCredentialDto);
  }

  findAll() {
    return `This action returns all socialProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socialProfile`;
  }

  async update(updateSocialCredentialDto: UpdatePlatformConnectionDto) {
    return await this.repository.updatePlatformConnection(updateSocialCredentialDto);
  }

  remove(id: number) {
    return `This action removes a #${id} socialProfile`;
  }

  async syncAllForUser(userid: string) {
    const credentials = await this.findByUserId(userid);
    for(const credential of credentials) {
      try {
        const extractor = this.extractors[credential.platform] as IExtractor;
        if(!extractor) {
            throw new Error('Could not find extractor for platform: ' + credential.platform)
        }

        const oldestToProcess = new Date(process.env.OLDEST_TO_RETRIEVE);

        if(!credential.head) {
            // First retrieve. try to get all items if possible
            
            const latestToProcess = new Date();
            const {processedFrom, processedUntil} = await extractor.process(credential, {from: oldestToProcess, until: latestToProcess});
            
            credential.tail = processedFrom;
            credential.head = processedUntil;
            
            this.update(credential);
        } else {
            // process any since last retrieve
            const latestToProcess = new Date();
            const {processedFrom, processedUntil} = await extractor.process(credential, {from: credential.head, until: latestToProcess});

            if(processedFrom < credential.head) {
              // We couldn't process all new items
              // We are forced to move tail and redownload the rest
              credential.tail = processedFrom;
            } else {
              // Processed all new items
              // Save progress
              credential.head = processedUntil;
            }

            this.update(credential);
            
            if(oldestToProcess < credential.tail) {
              // We still didn't fetch all old history
              // So let's download more items
              const {processedFrom, processedUntil} = await extractor.process(credential, {from: oldestToProcess, until: credential.tail});

              // Save progress
              credential.tail = processedFrom;
              this.update(credential);
            }
        }
      } catch (err) {
        this.logger.debug('Got error processing platform ' + credential.platform + ': ' + err);
      }
    }
  }
}