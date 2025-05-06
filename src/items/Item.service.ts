import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "src/db/entities/item.entity";
import { Repository } from "typeorm";
import { CreateItemDto } from "./dto/Create-Item.dto";
import { User } from "src/db/entities/user.entity";

@Injectable()
export class itemsService{
    @InjectRepository(Item)
    private itemsRepo: Repository<Item>

    async createItem(dto: CreateItemDto, user: User){
        const item = this.itemsRepo.create({
            ...dto,
            owner: user,
            reserved: false,
            created_at: new Date(),
            updated_at: new Date()
        })
        await this.itemsRepo.save(item)
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

