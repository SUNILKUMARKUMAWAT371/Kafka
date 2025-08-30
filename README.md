# Kafka with Node.js Producer and Consumer

This repo provides a basic example of how to use [Apache Kafka](https://kafka.apache.org/) with Node.js using the [`kafkajs`](https://kafka.js.org/) library. It includes a simple producer to send messages and a consumer to receive them.

## About Kafka

Apache Kafka is a distributed event streaming platform capable of handling trillions of events a day. Originally developed at LinkedIn and now part of the Apache Software Foundation, Kafka is used for building real-time data pipelines and streaming applications. It is horizontally scalable, fault-tolerant, and extremely fast.

## Prerequisites

Before you begin, ensure you have the following installed:
*   Node.js (v14 or later recommended)
*   npm or yarn
*   A running Apache Kafka cluster. You can use a local setup with Docker or a managed service.

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install dependencies

```bash
npm install
```
or
```bash
yarn install
```

### 3. Configuration

The Kafka client needs to be configured to connect to your Kafka cluster. This is typically done in a dedicated configuration file (e.g., `src/kafka.js`) or using environment variables.

Create a `.env` file in the root of the project and add your Kafka broker details:

```env
# .env
KAFKA_BROKERS=kafka1:9092,kafka2:9092
KAFKA_CLIENT_ID=my-app

# Optional: SASL Authentication (e.g., PLAIN)
# The context file indicates SASL might be in use.
# Supported mechanisms: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512, OAUTHBEARER, AWS
KAFKA_SASL_MECHANISM=PLAIN
KAFKA_USERNAME=my-user
KAFKA_PASSWORD=my-password
```

You would then use these variables to configure your `kafkajs` client instance.

**Example `src/kafka.js`:**

```javascript
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'my-app',
  brokers: process.env.KAFKA_BROKERS.split(','),
  ssl: true, // Set to true if your brokers use SSL
  sasl: {
    mechanism: process.env.KAFKA_SASL_MECHANISM, // 'plain', 'scram-sha-256', 'scram-sha-512'
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
})

module.exports = kafka
```
*Note: The SASL configuration might vary based on the mechanism you are using. The example above is for `PLAIN` or `SCRAM`.*

## Usage

This project likely contains a producer and a consumer script.

### Running the Producer

The producer sends messages to a specific Kafka topic.

```bash
node src/producer.js
```

### Running the Consumer

The consumer subscribes to a topic and prints the messages it receives.

```bash
node src/consumer.js
```

You should see the messages logged by the producer appear in the consumer's console output.

## Project Structure

A typical structure for this project would be:

```
.
├── node_modules/
├── src/
│   ├── producer.js   # Script to send messages
│   ├── consumer.js   # Script to receive messages
│   └── kafka.js      # Kafkajs client configuration
├── .env              # Environment variables for configuration (not committed)
├── package.json
└── README.md
```

This new `README.md` should make it much easier for anyone to get started with your project. Let me know if you'd like any adjustments!

<!--
[PROMPT_SUGGESTION]Create example `producer.js` and `consumer.js` files based on the new README.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]How do I set up a local Kafka cluster using Docker for testing this project?[/PROMPT_SUGGESTION]
