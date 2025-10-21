import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class AppModule {}
