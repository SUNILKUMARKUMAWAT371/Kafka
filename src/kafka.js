// const { Kafka } = require('kafkajs')

// const kafka = new Kafka({
//   clientId: process.env.KAFKA_CLIENT_ID || 'my-app',
//   brokers: process.env.KAFKA_BROKERS.split(','),
//   ssl: true, // Set to true if your brokers use SSL
//   sasl: {
//     mechanism: process.env.KAFKA_SASL_MECHANISM, // 'plain', 'scram-sha-256', 'scram-sha-512'
//     username: process.env.KAFKA_USERNAME,
//     password: process.env.KAFKA_PASSWORD,
//   },
// })

// module.exports = kafka