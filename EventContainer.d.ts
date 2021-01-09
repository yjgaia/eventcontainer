export declare type EventHandler = (...params: any[]) => any;
export default abstract class EventContainer {
    private eventMap;
    on(eventName: string, eventHandler: EventHandler): void;
    pass(target: EventContainer, eventName: string): void;
    private pull;
    off(eventName: string, eventHandler?: EventHandler): void;
    fireEvent(eventName: string, ...params: any[]): Promise<void>;
    destroy(): void;
}
//# sourceMappingURL=EventContainer.d.ts.map