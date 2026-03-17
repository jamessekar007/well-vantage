import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './workout.entity';

@Injectable()
export class WorkoutsService {

  constructor(
    @InjectRepository(Workout)
    private workoutsRepo: Repository<Workout>,
  ) {}

  async addWorkout(userId: number, workoutName: string) {

    // Check duplicate workout for the same user
    const existing = await this.workoutsRepo.findOne({
      where: { workout: workoutName, userId },
    });

    if (existing) throw new BadRequestException('Workout already exists for this user');

    const workout = this.workoutsRepo.create({ workout: workoutName, userId });
    return this.workoutsRepo.save(workout);
  }

  async getUserWorkouts(userId: number) {
    return this.workoutsRepo.find({ where: { userId } });
  }
}