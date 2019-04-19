"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Registry {
    constructor() {
        this.pubs = [];
        this.subs = [];
    }
    addUser(user) {
        if (user.constructor.name == "Publisher")
            this.publishers.push(user);
        else
            this.subscribers.push(user);
    }
    getPublishers() {
        return this.publishers;
    }
    getSubscribers() {
        return this.subscribers;
    }
}
exports.Registry = Registry;
//# sourceMappingURL=registry.js.map