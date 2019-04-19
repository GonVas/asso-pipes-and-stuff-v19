import { UnboundedQueue } from "./queue";
import { Subscriber } from "./users";
import { worker } from "cluster";


export class Broker {

    private queues: any = {};

    constructor(public name: string, public registry: Registry) {
    }

}

class Broker {
    queues: any = {};

    constructor(public name: string, public registry: Registry) {
    }

    public assignQueues() {
        this.registry.getPublishers().forEach(publisher => this.queues[publisher.name] = new UnboundedQueue());      // Assign a fresh queue to each publisher.
        this.registry.getSubscribers().forEach(subscriber => this.queues[subscriber.name] = new UnboundedQueue());   // Assign a fresh queue to each subscriber.
    }

    public enqueueMessage(publisher: Publisher, message: Message) {
        this.queues[publisher.name].enqueue(message);
    }
}
