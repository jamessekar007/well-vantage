import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkoutPlan } from './workout-plan.entity';
import { Workout } from '../workouts/workout.entity';
import { CreateWorkoutPlanDto } from './dto/create-plan.dto';

@Injectable()
export class WorkoutPlanService {

  constructor(
    @InjectRepository(WorkoutPlan)
    private planRepo: Repository<WorkoutPlan>,

    @InjectRepository(Workout)
    private workoutRepo: Repository<Workout>,
  ) {}

  async create(dto: CreateWorkoutPlanDto) {


  const workout = await this.workoutRepo.findOne({
    where: { id: dto.workoutId },
  });

  if (!workout) {
    throw new Error('Workout not found');
  }

  const plan = this.planRepo.create({
    exercise: dto.exercise,
    sets: dto.sets,
    reps: dto.reps,
    workout: workout, // now guaranteed not null
  });

  return this.planRepo.save(plan);
  }

  async getPlansByWorkout(workoutId: number) {
    return this.planRepo.find({
      where: {
        workout: { id: workoutId },
      },
      relations: ['workout'],
    });
  }
}