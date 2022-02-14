import { CreatePointEventDto } from "src/point-event/dto/create-point-event.dto";
import { PointEvent } from "src/point-event/entities/point-event.entity";

export interface IPointRule {
    process(eventName, item): Promise<CreatePointEventDto | false>;
}