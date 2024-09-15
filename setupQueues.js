const amqp = require('amqplib');

async function setupQueues() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Declare exchanges
    const orderExchange = 'order_processing';
    const shippingExchange = 'shipping_processing';

    // Declare queues
    const paymentQueue = 'payment_queue';
    const inventoryQueue = 'inventory_queue';
    const shippingQueue = 'shipping_queue';

    await channel.assertQueue(paymentQueue, { durable: true });
    await channel.assertQueue(inventoryQueue, { durable: true });
    await channel.assertQueue(shippingQueue, { durable: true });

    console.log(`Queues created: ${paymentQueue}, ${inventoryQueue}, ${shippingQueue}`);

    // Bind the queues to exchanges
    // Direct exchange routing for order processing (with routing keys)
    await channel.bindQueue(paymentQueue, orderExchange, 'payment');
    await channel.bindQueue(inventoryQueue, orderExchange, 'inventory');

    // Fanout exchange binding for shipping (no routing key needed for fanout)
    await channel.bindQueue(shippingQueue, shippingExchange);

    console.log('Queues bound to exchanges successfully');

    // Close the connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error setting up queues:', error);
  }
}

setupQueues();