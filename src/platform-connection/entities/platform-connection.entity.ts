export class PlatformConnection {
    userid: string;
    profileId: string;
    platform: string;
    emails: string[];
    authToken: string;
    tokenSecret?: string;
    authExpiration: Date;
    head: Date;
    tail: Date;
    watchedResources: string[];
}