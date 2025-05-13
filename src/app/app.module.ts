import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DbConfigModule } from 'src/db/config.db';
import { ItemsModule } from 'src/items/Item.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [DbConfigModule, UsersModule, AuthModule, ItemsModule],
  providers: [{
    provide: 'APP_GUARD',
    useClass: AuthModule,
  }],
})
export class AppModule {}
