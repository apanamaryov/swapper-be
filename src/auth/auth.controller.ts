import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() userData: Prisma.UserCreateInput) {
    return this.authService.createUser(userData);
  }

  @Get('users')
  getUsers(@Body() params: Prisma.UserFindManyArgs) {
    return this.authService.users(params);
  }

  @Get('user/:id')
  getUser(@Param('id') id: string) {
    return this.authService.user({ id });
  }

  @Patch('user/:id')
  updateUser(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.authService.updateUser({ where: { id }, data });
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser({ id });
  }
}
