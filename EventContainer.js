"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyutil_1 = __importDefault(require("skyutil"));
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
    toss(eventName, to, toEventName) {
        this.on(eventName, async (...params) => {
            return await to.fireEvent(toEventName === undefined ? eventName : toEventName, ...params);
        });
    }
    off(eventName, eventHandler) {
        if (this.eventMap[eventName] !== undefined) {
            skyutil_1.default.pull(this.eventMap[eventName], eventHandler);
            if (this.eventMap[eventName].length === 0) {
                delete this.eventMap[eventName];
            }
        }
    }
    fireEvent(eventName, ...params) {
        const promises = [];
        if (this.eventMap[eventName] !== undefined) {
            for (const eventHandler of this.eventMap[eventName]) {
                promises.push(eventHandler(...params));
            }
        }
        return Promise.all(promises);
    }
    delete() {
        this.fireEvent("delete");
        this.eventMap = undefined;
        this.deleted = true;
    }
}
exports.default = EventContainer;
//# sourceMappingURL=EventContainer.js.map