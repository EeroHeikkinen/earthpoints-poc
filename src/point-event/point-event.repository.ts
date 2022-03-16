import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { PointEvent } from './entities/point-event.entity';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreatePointEventDto } from './dto/create-point-event.dto';
import { UpdatePointEventDto } from './dto/update-point-event.dto';
import { EventEmitter } from 'stream';

@Injectable()
export class PointEventRepository implements OnModuleInit {
    async updatePointEvent(updatePointEventDto: UpdatePointEventDto) {
        return (await this.pointEventMapper.update(updatePointEventDto)).toArray();
    }

    streamAllCreatedAfter(after: Date): EventEmitter {
        const stream = this.cassandraService.client.stream(
            'SELECT userid FROM earthpoints.point_event_by_created_at WHERE created_at > ? ALLOW FILTERING',
            [after],
        );

        return stream;
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
}