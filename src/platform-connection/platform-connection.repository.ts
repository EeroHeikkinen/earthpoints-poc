import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { PlatformConnection } from './entities/platform-connection.entity';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreatePlatformConnectionDto } from './dto/create-platform-connection.dto';
import { UpdatePlatformConnectionDto } from './dto/update-platform-connection.dto';

@Injectable()
export class PlatformConnectionRepository implements OnModuleInit {
    async updatePlatformConnection(updatePlatformConnectionDto: UpdatePlatformConnectionDto) {
        return (await this.mapper.update(updatePlatformConnectionDto)).toArray();
    }

    async findByProfileIdAndPlatform(profileid: string, platform: string) {
        return (await this.mapper.find({profileId: profileid, platform: platform})).toArray();
    }

    async findByPhone(phone: string) {
        const q = `SELECT * FROM earthpoints.platform_connection WHERE phone='${phone}' ALLOW FILTERING`;
        const result = await this.cassandraService.client.execute(q);

        return result;
    }

    async findByUserId(userid: any) {
        return (await this.mapper.find({userid})).toArray();
    }

    constructor(private cassandraService: CassandraService) { }

    mapper: mapping.ModelMapper<PlatformConnection>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'PlatformConnection': {
                    tables: ['platform_connection', 'platform_connection_by_profile_id_and_platform'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }

        this.mapper = this.cassandraService.createMapper(mappingOptions).forModel('PlatformConnection');
    }

    async addPlatformConnection(profile: CreatePlatformConnectionDto) {
        return (await this.mapper.insert(profile)).toArray();
    }

    async getPlatformConnectionl(userid) {
        return (await this.mapper.find({userid})).toArray();
    }

    async getAll(docInfo: mapping.FindDocInfo = {}) {
        return await this.mapper.findAll(docInfo, {fetchSize: 100000});
    }

}