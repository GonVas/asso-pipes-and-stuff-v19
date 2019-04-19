"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("./queue");
class Broker {
    constructor(name, registry) {
        this.name = name;
        this.registry = registry;
        this.queues = {};
    }
}
exports.Broker = Broker;
class Broker {
    constructor(name, registry) {
        this.name = name;
        this.registry = registry;
        this.queues = {};
    }
    assignQueues() {
        this.registry.getPublishers().forEach(publisher => this.queues[publisher.name] = new queue_1.UnboundedQueue()); // Assign a fresh queue to each publisher.
        this.registry.getSubscribers().forEach(subscriber => this.queues[subscriber.name] = new queue_1.UnboundedQueue()); // Assign a fresh queue to each subscriber.
    }
    enqueueMessage(publisher, message) {
        this.queues[publisher.name].enqueue(message);
    }
}
//# sourceMappingURL=broker.js.map