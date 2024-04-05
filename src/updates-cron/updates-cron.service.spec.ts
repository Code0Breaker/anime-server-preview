import { Test, TestingModule } from '@nestjs/testing';
import { UpdatesCronService } from './updates-cron.service';

describe('UpdatesCronService', () => {
  let service: UpdatesCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdatesCronService],
    }).compile();

    service = module.get<UpdatesCronService>(UpdatesCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
