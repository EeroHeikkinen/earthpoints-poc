import { Injectable } from '@nestjs/common';
import { Client, mapping, auth } from 'cassandra-driver';

@Injectable()
export class CassandraService {
    client: Client;
    mapper: mapping.Mapper;
    private createClient() {
        this.client = new Client({
            contactPoints: [process.env.CASSANDRA_CONTACT_POINTS || 'x'],
            keyspace: process.env.CASSANDRA_KEYSPACE  || 'x',
            localDataCenter: process.env.CASSANDRA_LOCAL_DATA_CENTER  || 'x',
            authProvider: new auth.PlainTextAuthProvider(process.env.CASSANDRA_USERNAME || 'x', process.env.CASSANDRA_PASSWORD || 'x')
        });
    }
    
    createMapper(mappingOptions: mapping.MappingOptions) {
     if(this.client == undefined) {
         this.createClient();
     }   
     return new mapping.Mapper(this.client, mappingOptions);
    }
}