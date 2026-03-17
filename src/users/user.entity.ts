import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn,
  UpdateDateColumn,OneToMany } from 'typeorm';
  import { Workout } from '../workouts/workout.entity';
  import { Exclude } from 'class-transformer';

@Entity()
export class User {

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  providerAccountId: string;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
   @OneToMany(() => Workout, workout => workout.user)
  workouts: Workout[];
}