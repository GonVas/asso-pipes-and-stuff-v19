"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Registry {
    constructor() {
        this.pubs = [];
        this.subs = [];
    }
    addUser(user) {
        if (user.constructor.name == "Publisher")
            this.pubs.push(user);
        else
            this.subs.push(user);
    }
    getPublishers() {
        return this.pubs;
    }
    getSubscribers() {
        return this.subs;
    }
}
exports.Registry = Registry;
//# sourceMappingURL=registry.js.map