const amqp = require('amqplib');

async function setupExchanges() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Create a direct exchange for order processing
    const orderExchange = 'order_processing';
    await channel.assertExchange(orderExchange, 'direct', { durable: true });
    console.log(`Exchange '${orderExchange}' created`);

    // Create a fanout exchange for shipping processing
    const shippingExchange = 'shipping_processing';
    await channel.assertExchange(shippingExchange, 'fanout', { durable: true });
    console.log(`Exchange '${shippingExchange}' created`);

    // Close the connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error setting up exchanges:', error);
  }
}

setupExchanges();