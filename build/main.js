"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./users");
const queue_1 = require("./queue");
const ventilator_1 = require("./ventilator");
const broker_1 = require("./broker");
setInterval(() => { }, 1000);
var max_works = 30;
function scenario1() {
    return __awaiter(this, void 0, void 0, function* () {
        // Do your stuff here
        console.log("Scenario 1");
        let p1 = new users_1.Publisher;
        let q1 = new queue_1.UnboundedQueue;
        let s1 = new users_1.Subscriber(0);
        //This will make sure subscriber consumes a max works
        for (let i = 0; i < 15; i++) {
            console.log('Subscribing');
            let possible_work = q1.dequeue();
            s1.consumework(possible_work);
        }
        for (let i = 0; i < max_works; i++) {
            const work = yield p1.getwork();
            q1.enqueue(work);
            console.log("P1 published : " + work);
            console.log("Size of queue : " + q1.queue.length);
        }
        process.exit();
    });
}
;
function scenario2() {
    return __awaiter(this, void 0, void 0, function* () {
        // Do your stuff here
        console.log("Scenario 2");
        let p1 = new users_1.Publisher;
        let q1 = new queue_1.UnboundedQueue;
        let subs = new Array();
        for (let i = 0; i < 5; i++) {
            console.log('Creting with sub id: ' + i);
            let sub = new users_1.Subscriber(i);
            subs.push(sub);
        }
        //randmoly assign subscriptions, simulating users clicking subscribe at different times and different amounts
        for (let i = 0; i < 35; i++) {
            var randsub = subs[Math.floor(Math.random() * subs.length)];
            let possible_work = q1.dequeue();
            randsub.consumework(possible_work);
        }
        for (let i = 0; i < max_works; i++) {
            const work = yield p1.getwork();
            q1.enqueue(work);
            console.log("P1 published : " + work);
            console.log("Size of queue : " + q1.queue.length);
        }
        process.exit();
    });
}
;
function scenario3() {
    return __awaiter(this, void 0, void 0, function* () {
        // Do your stuff here
        console.log("Scenario 3");
        let p1 = new users_1.Publisher;
        let q1 = new queue_1.UnboundedQueue;
        let v1 = new ventilator_1.Ventilator(q1);
        let subs = new Array();
        for (let i = 0; i < 5; i++) {
            console.log('Creting with sub id: ' + i);
            let sub = new users_1.Subscriber(i);
            //subs.push(sub)
            v1.register(sub);
        }
        v1.start_notifying(max_works, false);
        for (let i = 0; i < max_works; i++) {
            const work = yield p1.getwork();
            q1.enqueue(work);
            console.log("P1 published : " + work);
            console.log("Size of queue : " + q1.queue.length);
        }
        process.exit();
    });
}
;
function scenario4() {
    return __awaiter(this, void 0, void 0, function* () {
        // Do your stuff here
        console.log("Scenario 4");
        let p_cats = new users_1.SpecilalityPublisher("cats");
        let p_computers = new users_1.SpecilalityPublisher("computers");
        let p_cars = new users_1.SpecilalityPublisher("cars");
        let q1 = new queue_1.UnboundedQueue;
        let b1 = new broker_1.Broker('Broker');
        b1.addSpecPub(p_cats);
        b1.addSpecPub(p_computers);
        b1.addSpecPub(p_cars);
        let broker_avalspecs = b1.getPubTypes();
        console.log("Avaiable Publishers Types/Topics:");
        for (let i = 0; i < broker_avalspecs.length; i++) {
            const type = broker_avalspecs[i];
            console.log(type);
        }
        console.log('Creting with sub id: ' + 0 + '. Wants to read cats.');
        let sub0 = new users_1.Subscriber(0);
        b1.addSub(sub0, "cats");
        console.log('Creting with sub id: ' + 1 + '. Wants to read cars.');
        let sub1 = new users_1.Subscriber(1);
        b1.addSub(sub1, "cars");
        console.log('Creting with sub id: ' + 2 + '. Wants to read computers.');
        let sub2 = new users_1.Subscriber(2);
        b1.addSub(sub2, "computers");
        console.log('Creting with sub id: ' + 3 + '. Wants to read cats.');
        let sub3 = new users_1.Subscriber(3);
        b1.addSub(sub3, "cats");
        console.log('Creting with sub id: ' + 4 + '. Wants to read cars.');
        let sub4 = new users_1.Subscriber(4);
        b1.addSub(sub4, "cars");
        b1.start_notifying(max_works, false);
        yield b1.start_publishing(max_works);
        process.exit();
    });
}
;
scenario4();
//# sourceMappingURL=main.js.map