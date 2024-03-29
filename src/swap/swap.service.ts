import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Swap } from '@prisma/client';

@Injectable()
export class SwapService {
  constructor(private prisma: PrismaService) {}

  createSwap(data: Prisma.SwapCreateInput): Promise<Swap> {
    return this.prisma.swap.create({ data });
  }

  swaps(params: Prisma.SwapFindManyArgs): Promise<Swap[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.swap.findMany({ skip, take, cursor, where, orderBy });
  }

  swap(
    swapWhereUniqueInput: Prisma.SwapWhereUniqueInput,
  ): Promise<Swap | null> {
    return this.prisma.swap.findUnique({ where: swapWhereUniqueInput });
  }

  updateSwap(params: {
    where: Prisma.SwapWhereUniqueInput;
    data: Prisma.SwapUpdateInput;
  }): Promise<Swap> {
    const { where, data } = params;
    return this.prisma.swap.update({
      data,
      where,
    });
  }

  deleteSwap(where: Prisma.SwapWhereUniqueInput): Promise<Swap> {
    return this.prisma.swap.delete({ where });
  }
}
