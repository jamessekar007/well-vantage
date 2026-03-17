import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
//import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { WorkoutsModule } from './workouts/workouts.module';
import { WorkoutPlanModule } from './workout-plans/workout-plan.module';
import { AvailabilityModule } from './availability/availability.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE  as any || 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT  as any || 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'James',
      database: process.env.DATABASE_NAME || 'vantage',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'P0VlpF86jFLONA9kowSq3WsLVrQ5PHjq1LqF0yrwDq1',
        signOptions: { 
         expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as unknown as number, // cast to string
      },
    }),
      WorkoutsModule,
      WorkoutPlanModule,
      AvailabilityModule,
  ],
})
export class AppModule {}