import SkyUtil from "skyutil";

export type EventHandler = (...params: any[]) => any;

export default abstract class EventContainer {

    private eventMap: { [eventName: string]: EventHandler[] } = {};
    public deleted = false;

    public on(eventName: string, eventHandler: EventHandler) {
        if (this.eventMap[eventName] === undefined) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push(eventHandler);
    }

    public toss(eventName: string, to: EventContainer, toEventName?: string) {
        this.on(eventName, (...params) => {
            const results = to.fireEvent(toEventName === undefined ? eventName : toEventName, ...params);
            const promises: Promise<void>[] = [];
            for (const result of results) {
                if (result instanceof Promise) {
                    promises.push(result);
                }
            }
            if (promises.length > 0) {
                return Promise.all(promises);
            }
        });
    }

    public off(eventName: string, eventHandler: EventHandler) {
        if (this.eventMap[eventName] !== undefined) {
            SkyUtil.pull(this.eventMap[eventName], eventHandler);
            if (this.eventMap[eventName].length === 0) {
                delete this.eventMap[eventName];
            }
        }
    }

    public fireEvent(eventName: string, ...params: any[]): any[] {
        const results: any[] = [];
        if (this.eventMap[eventName] !== undefined) {
            for (const eventHandler of this.eventMap[eventName]) {
                results.push(eventHandler(...params));
            }
        }
        return results;
    }

    public delete() {
        this.fireEvent("delete");
        (this.eventMap as unknown) = undefined;
        this.deleted = true;
    }
}
