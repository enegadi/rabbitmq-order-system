const amqp = require('amqplib');

async function startInventoryConsumer() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const inventoryQueue = 'inventory_queue';

    // Assert the queue
    await channel.assertQueue(inventoryQueue, { durable: true });

    // Consume messages from the queue
    console.log('Waiting for messages in inventory queue...');
    await channel.consume(inventoryQueue, (msg) => {
      const order = JSON.parse(msg.content.toString());
      console.log(`Checking inventory for order: ${order.order_id}`);

      // Acknowledge the message
      channel.ack(msg);
    });
  } catch (error) {
    console.error('Error in inventory consumer:', error);
  }
}

startInventoryConsumer();