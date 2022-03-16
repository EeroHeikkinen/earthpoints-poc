import { Injectable } from '@nestjs/common';
import { Kafka, Producer, Consumer, ProducerRecord, RecordMetadata } from 'kafkajs';
import KafkaObservable from 'kafka-observable';

@Injectable()
export class KafkaService {

  kafka: Kafka;
  producer: Producer;
  consumer: Consumer;
  observable: any;


  constructor(
    ){
      this.kafka = new Kafka({
        clientId: 'earthpoints',
        brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
      });
      this.producer = this.kafka.producer()
      this.consumer = this.kafka.consumer({ groupId: 'earthpoints-consumer' })
      this.observable = KafkaObservable({ brokers: `kafka://${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`, groupId: 'earthpoints-consumer' });
    }


    async send(record: ProducerRecord) : Promise<RecordMetadata[]> {
      await this.producer.connect();
      const result = await this.producer.send(record);
      await this.producer.disconnect();
      return result;
    }
}