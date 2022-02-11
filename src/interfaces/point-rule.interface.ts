import { PointEvent } from "src/point-event/entities/point-event.entity";

export interface IPointRule {
    process(eventName, item): Promise<PointEvent | false>;
}