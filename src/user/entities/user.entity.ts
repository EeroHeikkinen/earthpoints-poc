import { PointEvent } from "src/point-event/entities/point-event.entity";

export class User {
    userid: string;
    firstName?: string;
    points?: number;
    events?: PointEvent[];
}