const { Kafka } = require('kafkajs');
require('dotenv').config();

async function runProducer() {
  if (!process.env.KAFKA_BROKERS) {
    throw new Error('KAFKA_BROKERS environment variable is not set.');
  }

  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: process.env.KAFKA_BROKERS.split(','),
  });

  const producer = kafka.producer();

  await producer.connect();
  console.log("✅ Producer connected");

  const message = { value: 'Hello Kafka from Node.js! from mac' };

  await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [message],
  });

  console.log("📨 Message sent:", message);

  await producer.disconnect();
}

runProducer().catch(console.error);