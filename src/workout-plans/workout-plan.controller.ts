import { Controller, Post, Get, Body, Param, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { WorkoutPlanService } from './workout-plan.service';
import { CreateWorkoutPlanDto } from './dto/create-plan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('workout-plans')
export class WorkoutPlanController {

  constructor(private readonly planService: WorkoutPlanService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateWorkoutPlanDto) {
    try {
        const workoutsPlan = await this.planService.create(dto);

        return {
            data: workoutsPlan,
            message: 'Workouts plan added successfully',
        };
    } catch (error) {
        console.error(error);
        throw new HttpException(
            { data: null, message: error.message || 'Failed to fetch Workouts plan' },
            HttpStatus.BAD_REQUEST,
        );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':workoutId')
  async getByWorkout(@Param('workoutId') workoutId: number) {
    try {

    const workoutsPlan = await this.planService.getPlansByWorkout(workoutId);
    return {
        data: workoutsPlan,
        message: 'Workouts Plan fetched successfully',
      };
     } catch (error) {
        console.error(error);
        throw new HttpException(
            { data: null, message: error.message || 'Failed to fetch Workouts plan' },
            HttpStatus.BAD_REQUEST,
        );
    }
  }
}