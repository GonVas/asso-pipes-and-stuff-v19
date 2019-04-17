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
setInterval(() => { }, 1000);
function scenario1() {
    return __awaiter(this, void 0, void 0, function* () {
        // Do your stuff here
        let p1 = new users_1.Publisher;
        let q1 = new queue_1.UnboundedQueue;
        let s1 = new users_1.Subscriber(0);
        //This will make sure subscriber consumes a max works
        for (let i = 0; i < 15; i++) {
            console.log('Subscribing');
            let work = q1.dequeue();
            s1.consumework(work);
        }
        for (let i = 0; i < 50; i++) {
            const work = yield p1.getwork();
            q1.enqueue(work);
            console.log("P1 published : " + work);
            console.log("Size of queue : " + q1.queue.length);
        }
        process.exit();
    });
}
;
scenario1();
//# sourceMappingURL=main.js.map