import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreateSentEmailDto } from './dto/sent-email.dto';
import { UpdateSentEmailDto } from './dto/update-sent-email.dto';
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

    async getSentEmailsByUserId(userid: string) {
        const q = `SELECT * FROM earthpoints.sent_email WHERE userid=${userid} ALLOW FILTERING`;
        const result = await this.cassandraService.client.execute(q);

        return result;
    }

    async updateSentEmail(updateSentEmailDto: UpdateSentEmailDto) {
        return (await this.mapper.update(updateSentEmailDto)).toArray();
    }

    async deleteSentEmail(userid: string, template: string) {
        return await this.mapper.remove({ userid, template });
    }

    async addSentEmail(createSentEmailDto: CreateSentEmailDto) {
        return (await this.mapper.insert(createSentEmailDto)).toArray();
    }
}