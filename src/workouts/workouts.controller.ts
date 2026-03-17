import { Controller, Post, Get, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addWorkout(
    @CurrentUser() user: any,
    @Body('workout') workout: string
  ) {
    try {
      const userId = user.userId;
      const createdWorkout = await this.workoutsService.addWorkout(userId, workout);

      return {
        data: createdWorkout,
        message: 'Workout added successfully',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { data: null, message: error.message || 'Failed to add workout' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getWorkouts(@CurrentUser() user: any) {
    try {
      const userId = user.userId;
      const workouts = await this.workoutsService.getUserWorkouts(userId);

      return {
        data: workouts,
        message: 'Workouts fetched successfully',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { data: null, message: error.message || 'Failed to fetch workouts' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}