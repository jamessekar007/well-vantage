import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Workout } from '../workouts/workout.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class WorkoutPlan {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exercise: string;

  @Column()
  sets: number;

  @Column()
  reps: number;

  @ManyToOne(() => Workout, (workout) => workout.plans, { onDelete: 'CASCADE' })
  workout: Workout;
  
  @Exclude()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}