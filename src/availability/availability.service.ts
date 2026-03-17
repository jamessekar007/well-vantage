import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Availability } from './availability.entity';
import { User } from '../users/user.entity';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class AvailabilityService {

  constructor(
    @InjectRepository(Availability)
    private availabilityRepo: Repository<Availability>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(userId: number,dto: CreateAvailabilityDto) {

    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const records: Availability[] = [];

    for (const date of dto.dates) {
      for (const slot of dto.timeSlots) {

        const availability = this.availabilityRepo.create({
          sessionName: dto.sessionName,
          date,
          startTime: slot.startTime,
          endTime: slot.endTime,
          user,
        });

        records.push(availability);
      }
    }

    return this.availabilityRepo.save(records);
  }

  async getUserAvailability(userId: number, date?: string) {
     const whereCondition: any = {
        user: { id: userId },
    };

    if (date) {
        whereCondition.date = date;
    }

    return this.availabilityRepo.find({
        where: whereCondition,
        order: {
        date: 'ASC',
        startTime: 'ASC',
        },
    });
  }
}