import { Module } from '@nestjs/common';
import { DonateHistoryService } from './donate-history.service';
import { DonateHistoryController } from './donate-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationHistory } from 'src/db/entities/donate-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DonationHistory])],
  controllers: [DonateHistoryController],
  providers: [DonateHistoryService],
})
export class DonateHistoryModule {}
