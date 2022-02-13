import { SetMetadata } from '@nestjs/common';

export const CallbackURL = (...url: string[]) => SetMetadata('callbackURL', url);