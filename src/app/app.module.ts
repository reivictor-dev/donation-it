import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DbConfigModule } from 'src/db/config.db';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [DbConfigModule, UsersModule, AuthModule],
})
export class AppModule {}
