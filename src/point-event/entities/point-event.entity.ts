export class PointEvent {
    hash: string;
    userid: string;
    isBurn: boolean;
    points: number;
    message: string;
    verb?: string;
    platform?: string;
    icon?: string;
    timestamp: Date;
    metadata: Map<string, string>;
}