import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { SocialCredential } from './entities/social-credential.entity';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreateSocialCredentialDto } from './dto/create-social-credential.dto';
import { UpdateSocialCredentialDto } from './dto/update-social-credentials.dto';

@Injectable()
export class SocialCredentialRepository implements OnModuleInit {
    async updateSocialCredential(updateSocialCredentialDto: UpdateSocialCredentialDto) {
        return (await this.socialCredentialMapper.update(updateSocialCredentialDto)).toArray();
    }

    async findByProfileIdAndPlatform(profileid: string, platform: string) {
        return (await this.socialCredentialMapper.find({profileId: profileid, platform: platform})).toArray();
    }

    async findByUserId(userid: any) {
        return (await this.socialCredentialMapper.find({userid})).toArray();
    }

    constructor(private cassandraService: CassandraService) { }

    socialCredentialMapper: mapping.ModelMapper<SocialCredential>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'SocialCredential': {
                    tables: ['social_credential', 'social_credential_by_profile_id_and_platform'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }

        this.socialCredentialMapper = this.cassandraService.createMapper(mappingOptions).forModel('SocialCredential');
    }

    async addSocialCredential(profile: CreateSocialCredentialDto) {
        return (await this.socialCredentialMapper.insert(profile)).toArray();
    }

    async getSocialCredential(userid) {
        return (await this.socialCredentialMapper.find({userid})).toArray();
    }
}