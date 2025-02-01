// import { kafkaConsumer } from '@/config/kafka.js';
//
// export const startKafkaConsumer = async () => {
//   try {
//     // Connect to Kafka
//     await kafkaConsumer.connect();
//     console.log('Connected to Kafka');
//
//     // Subscribe to the topic
//     await kafkaConsumer.subscribe({ topic: process.env.KAFKA_TOPIC_NAME || '', fromBeginning: false });
//     console.log(`Subscribed to topic: ${process.env.KAFKA_TOPIC_NAME}`);
//
//     // Start consuming messages
//     await kafkaConsumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         const link = message.value?.toString();
//         if (link) {
//           console.log(`Received link: ${link}`);
//           await processNewsLink(link); // Process the link (e.g., extract content, clean, store in vector DB)
//         }
//       },
//     });
//   } catch (error) {
//     console.error('Error starting Kafka consumer:', error);
//   }
// };