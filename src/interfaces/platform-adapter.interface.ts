export interface IPlatformAdapter {
    syncUser: (UserCredentials) => Promise<void>;
}