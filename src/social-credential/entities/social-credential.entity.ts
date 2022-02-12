export class SocialCredential {
    userid: string;
    profileId: string;
    platform: string;
    authToken: string;
    tokenSecret?: string;
    authExpiration: Date;
    lastSync: Date;
    watchedResources: string[];
}