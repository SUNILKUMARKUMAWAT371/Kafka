const { Kafka } = require('kafkajs');

async function runConsumer() {
  const kafka = new Kafka({
    clientId: 'my-consumer',
    brokers: ['localhost:29092'], // match your Kafka broker
  });

  const consumer = kafka.consumer({ groupId: 'test-group' });

  await consumer.connect();
  console.log("✅ Consumer connected");

  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`📩 Received message: ${message.value.toString()} (partition: ${partition})`);
    },
  });
}

runConsumer().catch(console.error);

