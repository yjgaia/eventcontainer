export declare type EventHandler = (...params: any[]) => any;
export default abstract class EventContainer {
    private eventMap;
    deleted: boolean;
    on(eventName: string, eventHandler: EventHandler): void;
    pass(target: EventContainer, eventName: string): void;
    off(eventName: string, eventHandler: EventHandler): void;
    fireEvent(eventName: string, ...params: any[]): Promise<void>;
    delete(): void;
}
//# sourceMappingURL=EventContainer.d.ts.map