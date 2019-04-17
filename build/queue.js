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
class Message {
    constructor(value) {
        this.value = value;
    }
}
Message.none = new Message(null);
exports.Message = Message;
class UnboundedQueue {
    constructor() {
        this.queue = new Array();
        this.promises = new Array();
    }
    enqueue(msg) {
        if (this.promises.length > 0)
            this.promises.shift()(msg);
        else
            this.queue.push(msg);
    }
    dequeue() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                if (this.queue.length > 0) {
                    resolve(this.queue.shift());
                }
                else {
                    this.promises.push(resolve);
                }
            });
        });
    }
}
exports.UnboundedQueue = UnboundedQueue;
//# sourceMappingURL=queue.js.map