import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Location } from "src/db/entities/location.entity";
import { LocationService } from "./Location.service";
import { LocationController } from "./Location.controller";



@Module({
    imports: [TypeOrmModule.forFeature([Location])],
    controllers: [LocationController],
    providers: [LocationService],
    exports: [TypeOrmModule]
})
export class LocationModule{}