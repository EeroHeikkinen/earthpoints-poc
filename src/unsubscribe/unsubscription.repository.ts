import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreateUnsubscriptionDto } from './dto/create-unsubscription.dto';
import { UpdateUnsubscriptionDto } from './dto/update-unsubscription.dto';
import { Unsubscription } from './entities/unsubscription.entity';

@Injectable()
export class UnsubscriptionRepository implements OnModuleInit {
    constructor(private cassandraService: CassandraService) { }

    mapper: mapping.ModelMapper<Unsubscription>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'Unsubscription': {
                    tables: ['unsubscription'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }

        this.mapper = this.cassandraService.createMapper(mappingOptions).forModel('Unsubscription');
    }

    async find(userid: string) {
        return (await this.mapper.find({ userid })).toArray()[0];
    }

    async findAll() {
        return (await this.mapper.findAll({}, {fetchSize: 100000})).toArray();
    }

    async update(updateDto: UpdateUnsubscriptionDto) {
        updateDto.timestamp = new Date();
        return (await this.mapper.update(updateDto)).toArray()[0];
    }

    async delete(userid: string) {
        return await this.mapper.remove({ userid });
    }

    async add(createDto: CreateUnsubscriptionDto) {
        createDto.timestamp = new Date();
        return (await this.mapper.insert(createDto)).toArray()[0];
    }
}