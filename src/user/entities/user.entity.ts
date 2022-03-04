import { PlatformConnection } from "src/platform-connection/entities/platform-connection.entity";
import { PointEvent } from "src/point-event/entities/point-event.entity";

export class User {
    userid: string;
    firstName?: string;
    email?: string;
    timezone?: string;
    createdAt?: Date;
    events?: PointEvent[];
    connections?: PlatformConnection[];
    points?: number;
    lastEmailed?: Date;
}