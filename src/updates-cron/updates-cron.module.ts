import { Module } from '@nestjs/common';
import { UpdatesCronService } from './updates-cron.service';
import { UpdatesCronController } from './updates-cron.controller';

@Module({
  controllers: [UpdatesCronController],
  providers: [UpdatesCronService],
})
export class UpdatesCronModule {}
