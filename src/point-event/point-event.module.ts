import { forwardRef, Module } from '@nestjs/common';
import { PointEventService } from './point-event.service';
import { PointEventController } from './point-event.controller';
import { PointEventRepository } from './point-event.repository';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    CassandraModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [PointEventController],
  providers: [PointEventService, PointEventRepository],
  exports: [PointEventService]
})
export class PointEventModule {}
