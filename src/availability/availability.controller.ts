import { Controller, Post, Get, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('availability')
export class AvailabilityController {

  constructor(private readonly availabilityService: AvailabilityService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: any,@Body() dto: CreateAvailabilityDto) {
    return this.availabilityService.create(user.userId,dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserAvailability(@CurrentUser() user: any,@Query('date') date?: string) {
    return this.availabilityService.getUserAvailability(user.userId,date);
  }
/*
   @UseGuards(JwtAuthGuard)
    @Post()
    addWorkout(
      @CurrentUser() user: any,
      @Body('workout') workout: string
    ) {
      const userId = user.userId;
      return this.workoutsService.addWorkout(userId, workout);
    }
      */
}