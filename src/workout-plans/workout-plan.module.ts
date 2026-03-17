import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkoutPlan } from './workout-plan.entity';
import { Workout } from '../workouts/workout.entity';
import { WorkoutPlanService } from './workout-plan.service';
import { WorkoutPlanController } from './workout-plan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutPlan, Workout])],
  providers: [WorkoutPlanService],
  controllers: [WorkoutPlanController],
})
export class WorkoutPlanModule {}