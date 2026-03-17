import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { WorkoutPlan } from '../workout-plans/workout-plan.entity';
import { Exclude } from 'class-transformer';

@Entity('workouts')
export class Workout {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workout: string;

  @ManyToOne(() => User, user => user.workouts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Exclude()
  @Column()
  userId: number;

  @OneToMany(() => WorkoutPlan, (plan) => plan.workout)
  plans: WorkoutPlan[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}