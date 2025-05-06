import { Module } from '@nestjs/common';
import { DonateHistoryService } from './donate-history.service';
import { DonateHistoryController } from './donate-history.controller';

@Module({
  controllers: [DonateHistoryController],
  providers: [DonateHistoryService],
})
export class DonateHistoryModule {}
