import { PlatformConnection } from "src/platform-connection/entities/platform-connection.entity";

export interface IExtractor {
    process: (credential:PlatformConnection, {from, until}: {from: Date, until: Date}) => Promise<{processedUntil:Date, processedFrom:Date}>;
}