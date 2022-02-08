import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { PointEvent } from './point-event.model';
import { CassandraService } from 'src/cassandra/cassandra.service';

@Injectable()
export class AchievementRepository implements OnModuleInit {

    constructor(private cassandraService: CassandraService) { }

    achievementMapper: mapping.ModelMapper<PointEvent>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'Achievement': {
                    tables: ['achievement'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }

        this.achievementMapper = this.cassandraService.createMapper(mappingOptions).forModel('Achievement');
    }

    async addAchievement(achievement: PointEvent) {
        return (await this.achievementMapper.insert(achievement)).toArray();
    }

    async getAchievements(facebook_id) {
        return (await this.achievementMapper.find({facebook_id: facebook_id})).toArray();
    }
}