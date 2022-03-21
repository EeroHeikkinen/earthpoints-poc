import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { User } from './entities/user.entity';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository implements OnModuleInit {


    constructor(private cassandraService: CassandraService) { }

    userMapper: mapping.ModelMapper<User>;

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'User': {
                    tables: ['user'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }

        this.userMapper = this.cassandraService.createMapper(mappingOptions).forModel('User');
    }

    async create(user?: CreateUserDto) {
        if(!user) {
            user = {}
        }
        if(!user.userid) {
            const Uuid = require('cassandra-driver').types.Uuid;
            const userid = Uuid.random();
            user.userid = userid.toString();
        }
    
        return (await this.userMapper.insert(user)).toArray();
    }

    async update(updateUserDto: UpdateUserDto) {
        return await this.userMapper.update(updateUserDto);
    }

    async get(userid: string) {
        return await this.userMapper.get(({userid: userid}));
    }

    async getAll() {
        return await this.userMapper.findAll({}, {fetchSize: 100000});
    }
}