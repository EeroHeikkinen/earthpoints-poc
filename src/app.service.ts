import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getZero(): number {
    return 0;
  }
}
