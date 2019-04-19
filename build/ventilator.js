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
class Ventilator {
    constructor(queue) {
        this.subs = [];
        this.history = [];
        this.queue = queue;
    }
    register(sub) {
        console.log(sub.id, " sub is subscribed to work!");
        this.subs.push(sub);
    }
    start_notifying(max_works, todelete) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < max_works; i++) {
                let work = yield this.queue.dequeue();
                //let review = "I subscriber " + this.id + " consumed work: " + work + " and liked it"
                for (let j = 0; j < this.subs.length; j++) {
                    const sub = this.subs[j];
                    if (work.includes(sub.id.toString())) {
                        sub.consumework_now(work);
                    }
                }
                if (todelete == false) {
                    this.history.push(work);
                }
            }
        });
    }
    notify() {
    }
}
exports.Ventilator = Ventilator;
//# sourceMappingURL=ventilator.js.map