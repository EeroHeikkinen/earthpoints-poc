export class CreatePlatformConnectionDto {
    userid: string;
    profile_id: string;
    platform: string;
    auth_token: string;
    token_secret?: string;
    auth_expiration: Date;
}