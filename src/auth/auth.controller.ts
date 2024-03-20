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
import { Prisma, User } from '@prisma/client';
import { CredentialsDTO } from './dto/credentials-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() userData: Prisma.UserCreateInput) {
    return this.authService.createUser(userData);
  }

  @Post('signIn')
  async signIn(@Body() credentials: CredentialsDTO): Promise<Omit<User, 'password'>> {
    return this.authService.signIn(credentials);
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
