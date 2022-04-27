import { PlatformConnection } from 'src/platform-connection/entities/platform-connection.entity';
import { User } from 'src/user/entities/user.entity';

export interface IExtractor {
  process: (
    credential: PlatformConnection,
    { from, until }: { from: Date; until: Date },
    user: User,
  ) => Promise<{ processedUntil: Date; processedFrom: Date }>;
}
