import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards, Req,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Prisma } from '@prisma/client';
import {ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/auth.guard";

type ReqType = Request & {
  user: {
    sub: string,
    email: string,
    iat: number,
    exp: number,
  }
};

@Controller('item')
@ApiTags('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(AuthGuard)
  @Post('add')
  async addItem(@Body() itemData: Prisma.ItemCreateInput, @Req() req: ReqType) {
    return this.itemService.createItem({
      ...itemData,
      createdBy: { connect: { id: req.user.sub } },
      ownedBy: { connect: { id: req.user.sub } },
    });
  }

  @UseGuards(AuthGuard)
  @Get('list')
  getItems(@Body() params: Prisma.ItemFindManyArgs) {
    return this.itemService.items(params);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getItem(@Param('id') id: string) {
    return this.itemService.item({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateItem(@Param('id') id: string, @Body() data: Prisma.ItemUpdateInput) {
    return this.itemService.updateItem({ where: { id }, data });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    return this.itemService.deleteItem({ id });
  }
}
