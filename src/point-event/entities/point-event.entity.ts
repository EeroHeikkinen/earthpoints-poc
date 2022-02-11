export class PointEvent {
    hash: string;
    userid: string;
    isBurn: boolean;
    points: number;
    message: string;
    icon?: string;
    timestamp: Date;
    metadata: Map<string, string>;
}

// export class PointEvent {
//     hash: string;
//     userid: string;
//     isBurn: boolean;
//     message: string;
//     icon?: string;
//     points: number;
//     timestamp: Date;
//     metadata: Map<string, string>
// }