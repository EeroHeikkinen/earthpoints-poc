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

    constructor(private cassandraService: CassandraService) { }

    pointEventMapper: mapping.ModelMapper<PointEvent>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'PointEvent': {
                    tables: ['point_event', 'point_event_by_userid'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }

        this.pointEventMapper = this.cassandraService.createMapper(mappingOptions).forModel('PointEvent');
    }

    async addPointEvent(pointEvent: CreatePointEventDto) {
        return (await this.pointEventMapper.insert(pointEvent)).toArray();
    }

    async findAll() {
        return (await this.pointEventMapper.findAll()).toArray();
    }

    async getPointEventsByUserId(userid) {
        return (await this.pointEventMapper.find({userid})).toArray();
    }

    async findOne(hash) {
        return (await this.pointEventMapper.find({hash})).toArray()[0];
    }
    async getPointEventsByHash(hash) {
        return (await this.pointEventMapper.find({hash})).toArray();
    }
}