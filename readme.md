# Messaging Queue System with RabbitMQ (Order Processing System)

This project demonstrates a simple **order processing system** using **RabbitMQ**, a popular message broker. The system simulates the flow of customer orders through various services, such as payment, inventory, and shipping, by utilizing message queues and consumers. 

## Project Overview

In this project, we have:

- A **Producer** that simulates an order service and sends new customer orders to RabbitMQ.
- **Two Exchanges** for routing messages: one for order processing and one for shipping.
- **Three Consumers** (payment, inventory, and shipping) that process messages from their respective queues.

### Components

- **Producer (Order Service)**: Creates new customer orders and sends them as messages to RabbitMQ exchanges.
- **Exchanges**:
  - **Order Processing Exchange** (Direct Exchange): Routes order-related messages to payment and inventory queues.
  - **Shipping Processing Exchange** (Fanout Exchange): Broadcasts order messages to shipping-related queues.
- **Queues**:
  - **Payment Queue**: Handles payment-related tasks.
  - **Inventory Queue**: Manages inventory checks.
  - **Shipping Queue**: Handles shipping and delivery tasks.
- **Consumers**:
  - **Payment Service**: Processes messages from the payment queue.
  - **Inventory Service**: Checks product availability from the inventory queue.
  - **Shipping Service**: Handles shipping-related tasks from the shipping queue.

## Prerequisites

Before setting up the project, ensure you have the following installed:

1. **Erlang**: RabbitMQ requires Erlang to run.
   - [Erlang Installation Guide](https://www.erlang.org/downloads)

2. **RabbitMQ**: Download and install RabbitMQ from the official website or use a package manager.
   - [RabbitMQ Installation Guide](https://www.rabbitmq.com/download.html)

Alternatively, you can use a cloud-hosted RabbitMQ service like **CloudAMQP**.

3. **Node.js**: Ensure you have Node.js installed on your system.
   - [Node.js Download](https://nodejs.org/)

## Getting Started

### Step 1: Clone the Repository

To start, clone the repository to your local machine:

```bash
git clone https://github.com/enegadi/rabbitmq-order-system.git
cd rabbitmq-order-system
```


### Step 2:  Install Dependencies

```bash
npm install
```

###  Step 3: Set Up RabbitMQ Queues and Exchanges
```bash
node setupQueues.js
```
### Step 4: Run the Consumers
Run each consumer in a separate terminal window:


#### 	1.	Payment Consumer:
```bash
node paymentConsumer.js
```
####	2.	Inventory Consumer:
```bash
node inventoryConsumer.js
```
#### 3.	Shipping Consumer:
```bash
node shippingConsumer.js
```

### Step 5: Run the Producer
Finally, start the producer to simulate sending orders:
```bash
node producer.js
````
This will generate an order, which will be routed through the exchanges to the relevant consumers.

### Project Workflow

1. The **Producer** generates an order with details such as `order_id`, `items`, and `amount`.
2. The order is sent to the **Order Processing Exchange**, which routes it to the **Payment Queue** and **Inventory Queue**.
3. Simultaneously, the order is also sent to the **Shipping Processing Exchange**, which broadcasts it to the **Shipping Queue**.
4. Each **Consumer** listens to its respective queue, processes the message, and completes its task (e.g., payment processing, inventory checking, or shipping).

