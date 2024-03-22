import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards, Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { CredentialsDTO } from './dto/credentials-dto';
import { AuthGuard } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() userData: Prisma.UserCreateInput) {
    return this.authService.createUser(userData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(
    @Body() credentials: CredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(credentials);
  }

  @UseGuards(AuthGuard)
  @Get('users')
  getUsers(@Body() params: Prisma.UserFindManyArgs) {
    return this.authService.users(params);
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  getUser(@Param('id') id: string) {
    return this.authService.user({ id });
  }

  @UseGuards(AuthGuard)
  @Patch('user/:id')
  updateUser(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.authService.updateUser({ where: { id }, data });
  }

  @UseGuards(AuthGuard)
  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser({ id });
  }
}
