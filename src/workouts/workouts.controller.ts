import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addWorkout(
    @CurrentUser() user: any,
    @Body('workout') workout: string
  ) {
    const userId = user.userId;
    return this.workoutsService.addWorkout(userId, workout);
  }




  @UseGuards(JwtAuthGuard)
  @Get()
  getWorkouts(@CurrentUser() user: any) {
    console.log('Current user:', user); // Debug log
    const userId = user.userId;
    return this.workoutsService.getUserWorkouts(userId);
  }
}