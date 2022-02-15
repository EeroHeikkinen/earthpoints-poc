export interface IExtractor {
    extractEvents: (UserCredentials) => Promise<void>;
}