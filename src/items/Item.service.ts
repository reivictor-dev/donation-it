import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DonationItem } from "src/db/entities/donate-item.entity";
import { Repository } from "typeorm";
import { CreateItemDto } from "./dto/Create-Item.dto";
import { User } from "src/db/entities/user.entity";
import { Location } from "src/db/entities/location.entity";

@Injectable()
export class itemsService{
    @InjectRepository(DonationItem)
    private itemsRepo: Repository<DonationItem>
    @InjectRepository(Location)
    private locationRepo: Repository<Location>

    async createItem(dto: CreateItemDto, user: User){
        const location = await this.locationRepo.findOneBy({id: dto.locationId});
        if(!location){
            throw new Error(`Location with ID ${dto.locationId} not found`)
        }

        const item = this.itemsRepo.create({
            ...dto,
            description: dto.description,
            location,
            owner: user
        })

        this.itemsRepo.save(item)
    }

    async findAll(){
        return this.itemsRepo.find({ where: {reserved: false}})
    }

    async findById(id: number){
        return this.itemsRepo.findOneBy({id})
    }

    async deleteById(id: number, userId: number){
        const item = await this.itemsRepo.findOneBy({id})
        if(!item || item.owner.id != userId) throw new ForbiddenException()
        return this.itemsRepo.delete(item)
    }
}

