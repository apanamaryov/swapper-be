import { Module } from '@nestjs/common';
import { SwapService } from './swap.service';
import { SwapController } from './swap.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SwapController],
  providers: [SwapService, PrismaService],
})
export class SwapModule {}
