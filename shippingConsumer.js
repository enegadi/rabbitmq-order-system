const amqp = require('amqplib');

async function startShippingConsumer() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const shippingQueue = 'shipping_queue';

    // Assert the queue
    await channel.assertQueue(shippingQueue, { durable: true });

    // Consume messages from the queue
    console.log('Waiting for messages in shipping queue...');
    await channel.consume(shippingQueue, (msg) => {
      const order = JSON.parse(msg.content.toString());
      console.log(`Shipping order: ${order.order_id}`);

      // Acknowledge the message
      channel.ack(msg);
    });
  } catch (error) {
    console.error('Error in shipping consumer:', error);
  }
}

startShippingConsumer();