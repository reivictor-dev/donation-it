import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Location } from "src/db/entities/location.entity";
import { Repository } from "typeorm";


@Injectable()
export class LocationService{
    constructor(
        @InjectRepository(Location)
        private locationRepository: Repository<Location>
    ){}

    async create(location: Partial<Location>): Promise<Location>{
        const loc = this.locationRepository.create(location)
        return this.locationRepository.save(loc)
    }

    async findAll(): Promise<Location[]>{
        return this.locationRepository.find()
    }

    async findOne(id: number): Promise<Location> {
        const location = await this.locationRepository.findOneBy({ id });
        if (!location) {
            throw new Error(`Location with id ${id} not found`);
        }
        return location;
      }
    
      async update(id: number, updateData: Partial<Location>): Promise<Location> {
        await this.locationRepository.update(id, updateData);
        return this.findOne(id);
      }
    
      async remove(id: number): Promise<void> {
        await this.locationRepository.delete(id);
      }
}