import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('google-login')
  signup(@Body() dto: CreateUserDto) {
    return this.usersService.signup(dto);
  }
}