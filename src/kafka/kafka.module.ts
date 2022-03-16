import { KafkaService } from './kafka.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [KafkaService],
    exports: [KafkaService]
})
export class KafkaModule { }