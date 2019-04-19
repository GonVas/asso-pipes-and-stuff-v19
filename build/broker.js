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
const queue_1 = require("./queue");
class UserQueue {
    constructor(user, type) {
        this.user = user;
        this.queue = new queue_1.UnboundedQueue();
        this.type = type;
    }
    getUser() {
        return this.user;
    }
    getQueue() {
        return this.queue;
    }
    getType() {
        return this.type;
    }
}
class Broker {
    constructor(name) {
        this.name = name;
        this.pubqueues = new Array();
        this.subqueues = new Array();
    }
    addSpecPub(specpub) {
        let uq = new UserQueue(specpub, specpub.getSpeciality());
        this.pubqueues.push(uq);
    }
    addSub(sub, wants) {
        if (this.getPubTypes().includes(wants)) {
            let new_subqueue = new UserQueue(sub, wants);
            this.subqueues.push(new_subqueue);
            return true;
        }
        return false;
    }
    getPubTypes() {
        let types = new Array();
        for (let i = 0; i < this.pubqueues.length; i++) {
            const pubq = this.pubqueues[i];
            types.push(pubq.getType());
        }
        return types;
    }
    start_publishing(max_works) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < max_works; i++) {
                for (let j = 0; j < this.pubqueues.length; j++) {
                    const pub = this.pubqueues[j];
                    const work = yield pub.getUser().getwork();
                    pub.getQueue().enqueue(work);
                    console.log("P" + j + " published : " + work);
                }
            }
        });
    }
    start_notifying(max_works, todelete) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let pub_i = 0; pub_i < this.pubqueues.length; pub_i++) {
                const pubqueue = this.pubqueues[pub_i];
                for (let i = 0; i < max_works; i++) {
                    let work = yield pubqueue.getQueue().dequeue();
                    for (let j = 0; j < this.subqueues.length; j++) {
                        const sub = this.subqueues[j];
                        if (pubqueue.getType() == sub.getType()) {
                            sub.getUser().consumework_now(work);
                        }
                    }
                }
            }
        });
    }
}
exports.Broker = Broker;
//# sourceMappingURL=broker.js.map