import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [AuthModule, ItemModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
