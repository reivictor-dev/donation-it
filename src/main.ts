import { NestFactory } from '@nestjs/core';
import { DbConfigModule } from './db/config.db';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true
  })
  await app.listen(3000);
}
bootstrap();
