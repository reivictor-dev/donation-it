import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DonateHistoryService } from './donate-history.service';
import { User } from 'src/db/entities/user.entity';
import { Item } from 'src/db/entities/item.entity';

@Controller('donate-history')
export class DonateHistoryController {
  constructor(private readonly donateHistoryService: DonateHistoryService) {}

  @Post('create')
  async create(
    @Body('donor') donor: User, 
    @Body('receiver') receiver: User,
    @Body('item') item: Item,
  ) {
    return await this.donateHistoryService.donate(donor, receiver, item);
  }

  @Get()
  async getAll(){
    return await this.donateHistoryService.getAll()
  }

  @Get(':id')
  async getById(@Param('id') id: number){
    return await this.donateHistoryService.getById(id)
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: 'PENDING' | 'COMPLETED'
  )
  {
    return await this.donateHistoryService.updateStatus(id, status);
  }
}
