import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { WorkoutPlanService } from './workout-plan.service';
import { CreateWorkoutPlanDto } from './dto/create-plan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('workout-plans')
export class WorkoutPlanController {

  constructor(private readonly planService: WorkoutPlanService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateWorkoutPlanDto) {
    return this.planService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':workoutId')
  getByWorkout(@Param('workoutId') workoutId: number) {
    return this.planService.getPlansByWorkout(workoutId);
  }
}