import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreateEmailContentTemplateDto } from './dto/email-content-template.dto';
import { UpdateEmailContentTemplateDto } from './dto/update-email-content-template.dto';
import { EmailContentTemplate } from './entities/email-content-template.entity';

@Injectable()
export class EmailContentTemplateRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

  mapper: mapping.ModelMapper<EmailContentTemplate>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        EmailContentTemplate: {
          tables: ['email_content_template'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.mapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('EmailContentTemplate');
  }

  async getEmailContentTemplateByKey(key: string) {
    return (await this.mapper.find({ key })).toArray();
  }

  async updateEmailContentTemplate(
    updateEmailContentTemplateDto: UpdateEmailContentTemplateDto,
  ) {
    return (await this.mapper.update(updateEmailContentTemplateDto)).toArray();
  }

  async addEmailContentTemplate(
    createEmailContentTemplateDto: CreateEmailContentTemplateDto,
  ) {
    return (await this.mapper.insert(createEmailContentTemplateDto)).toArray();
  }
}
