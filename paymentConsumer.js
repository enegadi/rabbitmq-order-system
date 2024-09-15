const amqp = require('amqplib');

async function startPaymentConsumer() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const paymentQueue = 'payment_queue';

    // Assert the queue
    await channel.assertQueue(paymentQueue, { durable: true });

    // Consume messages from the queue
    console.log('Waiting for messages in payment queue...');
    await channel.consume(paymentQueue, (msg) => {
      const order = JSON.parse(msg.content.toString());
      console.log(`Processing payment for order: ${order.order_id}`);

      // Acknowledge the message
      channel.ack(msg);
    });
  } catch (error) {
    console.error('Error in payment consumer:', error);
  }
}

startPaymentConsumer();