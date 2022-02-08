import { PartialType } from '@nestjs/mapped-types';
import { CreateSocialCredentialDto } from './create-social-credential.dto';

export class UpdateSocialCredentialDto extends PartialType(CreateSocialCredentialDto) {}
