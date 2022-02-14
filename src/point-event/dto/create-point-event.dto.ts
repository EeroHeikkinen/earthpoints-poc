export class CreatePointEventDto {
    hash?: string;
    hashString?: string;
    userid: string;
    icon?: string;
    verb: string;
    platform: string;
    message: string;
    isBurn: boolean;
    points: number;
    timestamp: Date;
    metadata: Map<string, string>;
}