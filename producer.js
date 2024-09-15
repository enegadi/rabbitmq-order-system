const amqp = require('amqplib');

async function sendOrder() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const orderExchange = 'order_processing';
    const shippingExchange = 'shipping_processing';

    // Order message
    const order = {
      order_id: Math.floor(Math.random() * 1000),
      items: ['item1', 'item2'],
      amount: 100
    };

    // Publish messages to the exchanges
    channel.publish(orderExchange, 'payment', Buffer.from(JSON.stringify(order)));
    channel.publish(orderExchange, 'inventory', Buffer.from(JSON.stringify(order)));
    channel.publish(shippingExchange, '', Buffer.from(JSON.stringify(order)));

    console.log(`Order sent: ${order.order_id}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error in producer:', error);
  }
}

sendOrder();