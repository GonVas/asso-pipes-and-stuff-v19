import { Publisher, Subscriber, SpecilalityPublisher } from "./users";
import { UnboundedQueue } from "./queue"
import { Ventilator } from "./ventilator";
import { Broker } from "./broker";

setInterval(() => { }, 1000)

var max_works = 30

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


    for (let i = 0; i < max_works; i++) {
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


    for (let i = 0; i < max_works; i++) {
        const work = await p1.getwork();

        q1.enqueue(work)

        console.log("P1 published : " + work)
        console.log("Size of queue : " + q1.queue.length)


    }
    
    process.exit()
};


async function scenario3() {
    // Do your stuff here

    console.log("Scenario 3")

    let p1 = new Publisher;

    let q1 = new UnboundedQueue;

    let v1 = new Ventilator(q1);

    let subs = new Array<Subscriber>();

   
    for (let i = 0; i < 5; i++) {
        console.log('Creting with sub id: ' + i )
        let sub = new Subscriber(i);
        //subs.push(sub)
        v1.register(sub)
    }


    v1.start_notifying(max_works, false)

    for (let i = 0; i < max_works; i++) {
        const work = await p1.getwork();

        q1.enqueue(work)

        console.log("P1 published : " + work)
        console.log("Size of queue : " + q1.queue.length)


    }
    
    process.exit()
};



async function scenario4() {
    // Do your stuff here

    console.log("Scenario 4")

    let p_cats = new SpecilalityPublisher("cats");
    let p_computers = new SpecilalityPublisher("computers");
    let p_cars = new SpecilalityPublisher("cars");

    let q1 = new UnboundedQueue;

    let b1 = new Broker('Broker');

    b1.addSpecPub(p_cats)
    b1.addSpecPub(p_computers)
    b1.addSpecPub(p_cars)


    let broker_avalspecs = b1.getPubTypes()

    console.log("Avaiable Publishers Types/Topics:")
    for (let i = 0; i < broker_avalspecs.length; i++) {
        const type = broker_avalspecs[i];
        console.log(type)
    }

    console.log('Creting with sub id: ' + 0 + '. Wants to read cats.' )
    let sub0 = new Subscriber(0);
    b1.addSub(sub0, "cats")

    console.log('Creting with sub id: ' + 1 + '. Wants to read cars.' )
    let sub1 = new Subscriber(1);
    b1.addSub(sub1, "cars")

    console.log('Creting with sub id: ' + 2 + '. Wants to read computers.' )
    let sub2 = new Subscriber(2);
    b1.addSub(sub2, "computers")

    console.log('Creting with sub id: ' + 3 + '. Wants to read cats.' )
    let sub3 = new Subscriber(3);
    b1.addSub(sub3, "cats")

    console.log('Creting with sub id: ' + 4 + '. Wants to read cars.' )
    let sub4 = new Subscriber(4);
    b1.addSub(sub4, "cars")


    b1.start_notifying(max_works, false)
    await b1.start_publishing(max_works)
    
    process.exit()
};

scenario4()