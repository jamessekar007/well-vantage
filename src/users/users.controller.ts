import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('google-login')
  signup(@Body() dto: CreateUserDto) {
    try {
            return this.usersService.signup(dto);
        }
    catch (error) {
        console.error(error);
    throw new HttpException(
        { data: null, message: error.message || 'Failed to fetch workouts' },
        HttpStatus.BAD_REQUEST,
    );
}
}
}