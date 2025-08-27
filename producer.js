const { Kafka } = require('kafkajs');

async function runProducer() {
  const kafka = new Kafka({
    clientId: 'my-producer',
    brokers: ['localhost:29092'], // change if Kafka is on another host/port
  });

  const producer = kafka.producer();

  await producer.connect();
  console.log("✅ Producer connected");

  const message = { value: 'Hello Kafka from Node.js! from Consumer' };

  await producer.send({
    topic: 'test-topic',
    messages: [message],
  });

  console.log("📨 Message sent:", message);

  await producer.disconnect();
}

runProducer().catch(console.error);
