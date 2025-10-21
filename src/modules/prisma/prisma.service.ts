import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  client: PrismaClient;

  constructor(config: ConfigService) {
    const dbUrl = config.getOrThrow<string>('DATABASE_URL');
    const adapter = new PrismaBetterSQLite3({ url: dbUrl });
    this.client = new PrismaClient({ adapter });
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
