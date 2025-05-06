import { Controller } from '@nestjs/common';
import { DonateHistoryService } from './donate-history.service';

@Controller('donate-history')
export class DonateHistoryController {
  constructor(private readonly donateHistoryService: DonateHistoryService) {}
}
