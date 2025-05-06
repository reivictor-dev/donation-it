import { Test, TestingModule } from '@nestjs/testing';
import { DonateHistoryService } from './donate-history.service';

describe('DonateHistoryService', () => {
  let service: DonateHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonateHistoryService],
    }).compile();

    service = module.get<DonateHistoryService>(DonateHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
