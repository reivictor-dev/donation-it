import { Test, TestingModule } from '@nestjs/testing';
import { DonateHistoryController } from './donate-history.controller';
import { DonateHistoryService } from './donate-history.service';

describe('DonateHistoryController', () => {
  let controller: DonateHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonateHistoryController],
      providers: [DonateHistoryService],
    }).compile();

    controller = module.get<DonateHistoryController>(DonateHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
