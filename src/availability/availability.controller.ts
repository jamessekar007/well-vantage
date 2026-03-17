import { Controller, Post, Get, Body, Param, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('availability')
export class AvailabilityController {

  constructor(private readonly availabilityService: AvailabilityService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser() user: any,@Body() dto: CreateAvailabilityDto) {
    try {

     const availability = await this.availabilityService.create(user.userId,dto);
    return {
        data: availability,
        message: 'Availability Added successfully',
      };

    }
    catch (error) {
            console.error(error);
        throw new HttpException(
            { data: null, message: error.message || 'Failed to fetch workouts' },
            HttpStatus.BAD_REQUEST,
        );
  }
}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserAvailability(@CurrentUser() user: any,@Query('date') date?: string) {
     try {

   const availability = await this.availabilityService.getUserAvailability(user.userId,date);
    return {
        data: availability,
        message: 'Availability Fetched successfully',
      };

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