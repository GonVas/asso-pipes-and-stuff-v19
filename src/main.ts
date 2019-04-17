import { Publisher, Subscriber } from "./users";
import { UnboundedQueue } from "./queue"

setInterval(() => { }, 1000)

async function scenario1() {
    // Do your stuff here



    let p1 = new Publisher;
    let q1 = new UnboundedQueue;
    let s1 = new Subscriber(0);

    //This will make sure subscriber consumes a max works
    for (let i = 0; i < 15; i++) {
        console.log('Subscribing')
       let work = q1.dequeue()
       s1.consumework(work)
    }


    for (let i = 0; i < 50; i++) {
        const work = await p1.getwork();

        q1.enqueue(work)

        console.log("P1 published : " + work)
        console.log("Size of queue : " + q1.queue.length)


    }
    


    process.exit()
};

scenario1()