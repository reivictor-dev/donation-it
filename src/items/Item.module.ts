import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DonationItem } from "src/db/entities/donate-item.entity";
import { ItemController } from "./Item.controller";
import { itemsService } from "./Item.service";
import { Location } from "src/db/entities/location.entity";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        TypeOrmModule.forFeature([DonationItem, Location]),
        JwtModule.register({})
    ],
    controllers:[ItemController],
    providers:[itemsService]
})
export class ItemsModule{}