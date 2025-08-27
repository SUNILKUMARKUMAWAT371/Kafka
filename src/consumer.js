const { Kafka } = require('kafkajs');
require('dotenv').config();

async function runConsumer() {
  if (!process.env.KAFKA_BROKERS) {
    throw new Error('KAFKA_BROKERS environment variable is not set.');
  }

  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: process.env.KAFKA_BROKERS.split(','),
  });

  const consumer = kafka.consumer({ groupId: 'test-group' });

  await consumer.connect();
  console.log("✅ Consumer connected");

  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`📩 Received message: ${message.value.toString()} (partition: ${partition})`);
    },
  });
}

runConsumer().catch(console.error);