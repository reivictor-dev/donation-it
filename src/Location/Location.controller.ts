import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LocationService } from './Location.service';
import { Location } from 'src/db/entities/location.entity';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() location: Partial<Location>) {
    return this.locationService.create(location);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.locationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<Location>) {
    return this.locationService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.locationService.remove(id);
  }
}
