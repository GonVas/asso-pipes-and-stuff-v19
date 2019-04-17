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
class Publisher {
    getwork() {
        //delays random amount and then returns random string
        var delay = (Math.floor(Math.random() * 7)) + 2;
        delay *= 500;
        return new Promise(resolve => {
            setTimeout(() => {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 5; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                resolve(text);
            }, delay);
        });
    }
}
exports.Publisher = Publisher;
class Subscriber {
    constructor(id) {
        this.id = id;
    }
    consumework(pwork) {
        return __awaiter(this, void 0, void 0, function* () {
            let work = yield pwork;
            let review = "I subscriber " + this.id + " consumed work: " + work + " and liked it";
            console.log(review);
            return Promise.resolve();
        });
    }
}
exports.Subscriber = Subscriber;
//# sourceMappingURL=users.js.map