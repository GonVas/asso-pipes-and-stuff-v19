import { Publisher, Subscriber } from "./users";
import { UnboundedQueue } from "./queue"

setInterval(() => { }, 1000)

async function scenario1() {
    // Do your stuff here

    console.log("Scenario 1")

    let p1 = new Publisher;
    let q1 = new UnboundedQueue;
    let s1 = new Subscriber(0);

    //This will make sure subscriber consumes a max works
    for (let i = 0; i < 15; i++) {
        console.log('Subscribing')
       let possible_work = q1.dequeue()
       s1.consumework(possible_work)
    }


    for (let i = 0; i < 50; i++) {
        const work = await p1.getwork();

        q1.enqueue(work)

        console.log("P1 published : " + work)
        console.log("Size of queue : " + q1.queue.length)


    }
    
    process.exit()
};


async function scenario2() {
    // Do your stuff here

    console.log("Scenario 2")

    let p1 = new Publisher;

    let q1 = new UnboundedQueue;

    let subs = new Array<Subscriber>();

   
    for (let i = 0; i < 5; i++) {
        console.log('Creting with sub id: ' + i )
        let sub = new Subscriber(i);
        subs.push(sub)
    }

    //randmoly assign subscriptions, simulating users clicking subscribe at different times and different amounts
    for(let i = 0; i < 35; i++){
        var randsub = subs[Math.floor(Math.random() * subs.length)];
        let possible_work = q1.dequeue()
        randsub.consumework(possible_work)
    }


    for (let i = 0; i < 50; i++) {
        const work = await p1.getwork();

        q1.enqueue(work)

        console.log("P1 published : " + work)
        console.log("Size of queue : " + q1.queue.length)


    }
    
    process.exit()
};

scenario2()