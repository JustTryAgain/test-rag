import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'news-consumer',
  brokers: [process.env.KAFKA_BROKER || ''],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME || '',
    password: process.env.KAFKA_PASSWORD || '',
  },
});

export const kafkaConsumer = kafka.consumer({
  groupId: `${process.env.KAFKA_GROUP_ID_PREFIX}${Date.now()}`,
});