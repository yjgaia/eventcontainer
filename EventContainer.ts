export type EventHandler = (...params: any[]) => any;

export default abstract class EventContainer {

    private eventMap: { [eventName: string]: EventHandler[] } = {};

    public on(eventName: string, eventHandler: EventHandler) {
        if (this.eventMap[eventName] === undefined) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push(eventHandler);
    }

    public pass(target: EventContainer, eventName: string) {
        target.on(eventName, (...params) => this.fireEvent(eventName, ...params));
    }

    private pull(array: any[], ...removeList: any[]) {
        const removeSet = new Set(removeList)
        return array.filter((el) => {
            return removeSet.has(el) !== true;
        });
    }

    public off(eventName: string, eventHandler?: EventHandler) {
        if (eventHandler === undefined) {
            delete this.eventMap[eventName];
        } else if (this.eventMap[eventName] !== undefined) {
            const index = this.eventMap[eventName].indexOf(eventHandler);
            if (index !== -1) {
                this.eventMap[eventName].splice(index, 1);
            }
            if (this.eventMap[eventName].length === 0) {
                delete this.eventMap[eventName];
            }
        }
    }

    public async fireEvent(eventName: string, ...params: any[]): Promise<void> {
        if (this.eventMap[eventName] !== undefined) {
            for (const eventHandler of this.eventMap[eventName]) {
                await eventHandler(...params);
            }
        }
    }

    public destroy() {
        this.fireEvent("destroy");
        (this.eventMap as any) = undefined;
    }
}
