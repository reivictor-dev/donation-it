import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Category } from "./entities/category.entity";
import { DonationItem } from "./entities/donate-item.entity";
import { DonationHistory } from "./entities/donate-history.entity";
import { Location } from "./entities/location.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal:true}),
        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASS'),
                database: configService.get<string>('DB_NAME'),
                entities:[User, Category, Location, DonationItem, DonationHistory],
                synchronize: true,
                autoLoadEntities: true
            })
        })
    ],
    exports:[TypeOrmModule]
})
export class DbConfigModule{}