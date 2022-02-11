import { PointEvent } from "src/point-event/entities/point-event.entity";

export interface IRuleTemplate {
    process: (config, eventData) => Promise<PointEvent | false>;
}