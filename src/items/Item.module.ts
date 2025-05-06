import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "src/db/entities/item.entity";
import { ItemController } from "./Item.controller";
import { itemsService } from "./Item.service";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        TypeOrmModule.forFeature([Item, Location]),
        JwtModule.register({})
    ],
    controllers:[ItemController],
    providers:[itemsService]
})
export class ItemsModule{}