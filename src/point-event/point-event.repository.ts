import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { PointEvent } from './entities/point-event.entity';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreatePointEventDto } from './dto/create-point-event.dto';
import { UpdatePointEventDto } from './dto/update-point-event.dto';

@Injectable()
export class PointEventRepository implements OnModuleInit {
    async updatePointEvent(updatePointEventDto: UpdatePointEventDto) {
        return (await this.pointEventMapper.update(updatePointEventDto)).toArray();
    }

    async findByProfileIdAndPlatform(profileid: string, platform: string) {
        return (await this.pointEventMapper.find({profileId: profileid, platform: platform})).toArray();
    }

    async findByUserId(userid: any) {
        return (await this.pointEventMapper.find({userid})).toArray();
    }

    constructor(private cassandraService: CassandraService) { }

    pointEventMapper: mapping.ModelMapper<PointEvent>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'PointEvent': {
                    tables: ['point_event'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }

        this.pointEventMapper = this.cassandraService.createMapper(mappingOptions).forModel('PointEvent');
    }

    async addPointEvent(profile: CreatePointEventDto) {
        return (await this.pointEventMapper.insert(profile)).toArray();
    }

    async getPointEvents(userid) {
        return (await this.pointEventMapper.find({userid})).toArray();
    }
}