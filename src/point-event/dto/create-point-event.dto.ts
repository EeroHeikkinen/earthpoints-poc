export class CreatePointEventDto {
    hash: string;
    userid: string;
    isBurn: boolean;
    points: number;
    timestamp: Date;
    metadata: Map<string, string>;
}