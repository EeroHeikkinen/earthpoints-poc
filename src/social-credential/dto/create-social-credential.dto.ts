export class CreateSocialCredentialDto {
    userid: string;
    profile_id: string;
    platform: string;
    auth_token: string;
    auth_expiration: Date;
}