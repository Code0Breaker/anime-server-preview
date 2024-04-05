import { Test, TestingModule } from '@nestjs/testing';
import { UpdatesCronController } from './updates-cron.controller';
import { UpdatesCronService } from './updates-cron.service';

describe('UpdatesCronController', () => {
  let controller: UpdatesCronController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdatesCronController],
      providers: [UpdatesCronService],
    }).compile();

    controller = module.get<UpdatesCronController>(UpdatesCronController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
