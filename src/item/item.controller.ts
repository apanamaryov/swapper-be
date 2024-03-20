import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Prisma } from '@prisma/client';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('add')
  addItem(@Body() itemData: Prisma.ItemCreateInput) {
    return this.itemService.createItem(itemData);
  }

  @Get('items')
  getItems(@Body() params: Prisma.ItemFindManyArgs) {
    return this.itemService.items(params);
  }

  @Get(':id')
  getItem(@Param('id') id: string) {
    return this.itemService.item({ id });
  }

  @Patch(':id')
  updateItem(@Param('id') id: string, @Body() data: Prisma.ItemUpdateInput) {
    return this.itemService.updateItem({ where: { id }, data });
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    return this.itemService.deleteItem({ id });
  }
}
