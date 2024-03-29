import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SwapService } from './swap.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Prisma } from '@prisma/client';

type ReqType = Request & {
  user: {
    sub: string;
    email: string;
    iat: number;
    exp: number;
  };
};

@Controller('swap')
@ApiTags('Swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @UseGuards(AuthGuard)
  @Post('add')
  addSwap(@Body() itemData: Prisma.SwapCreateInput, @Req() req: ReqType) {
    return this.swapService.createSwap({
      ...itemData,
      createdBy: { connect: { id: req.user.sub } },
    });
  }

  @UseGuards(AuthGuard)
  @Get('list')
  getSwaps(@Body() params: Prisma.SwapFindManyArgs) {
    return this.swapService.swaps(params);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getSwap(@Param('id') id: string) {
    return this.swapService.swap({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateSwap(@Param('id') id: string, @Body() data: Prisma.SwapUpdateInput) {
    return this.swapService.updateSwap({ where: { id }, data });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteSwap(@Param('id') id: string) {
    return this.swapService.deleteSwap({ id });
  }
}
