"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventContainer {
    constructor() {
        this.eventMap = {};
        this.deleted = false;
    }
    on(eventName, eventHandler) {
        if (this.eventMap[eventName] === undefined) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push(eventHandler);
    }
    pass(target, eventName) {
        target.on(eventName, (...params) => this.fireEvent(eventName, ...params));
    }
    off(eventName, eventHandler) {
        if (this.eventMap[eventName] !== undefined) {
            const index = this.eventMap[eventName].indexOf(eventHandler);
            if (index !== -1) {
                this.eventMap[eventName].splice(index, 1);
            }
            if (this.eventMap[eventName].length === 0) {
                delete this.eventMap[eventName];
            }
        }
    }
    async fireEvent(eventName, ...params) {
        if (this.eventMap[eventName] !== undefined) {
            for (const eventHandler of this.eventMap[eventName]) {
                await eventHandler(...params);
            }
        }
    }
    delete() {
        this.fireEvent("delete");
        this.eventMap = undefined;
        this.deleted = true;
    }
}
exports.default = EventContainer;
//# sourceMappingURL=EventContainer.js.map