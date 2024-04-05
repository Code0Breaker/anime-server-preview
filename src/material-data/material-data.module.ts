import { Module } from '@nestjs/common';
import { MaterialDataService } from './material-data.service';
import { MaterialDataController } from './material-data.controller';

@Module({
  controllers: [MaterialDataController],
  providers: [MaterialDataService],
})
export class MaterialDataModule {}
