import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreateSentEmailDto } from './dto/sent-email.dto';
import { SentEmail } from './entities/sent-email.entity';

@Injectable()
export class SentEmailRepository implements OnModuleInit {
    constructor(private cassandraService: CassandraService) { }

    mapper: mapping.ModelMapper<SentEmail>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'SentEmail': {
                    tables: ['sent_email'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }

        this.mapper = this.cassandraService.createMapper(mappingOptions).forModel('SentEmail');
    }

    async getSentEmailByUserAndTemplateName(userid: string, template: string) {
        return (await this.mapper.find({ userid, template })).toArray();
    }

    async addSentEmail(createSentEmailDto: CreateSentEmailDto) {
        return (await this.mapper.insert(createSentEmailDto)).toArray();
    }

}