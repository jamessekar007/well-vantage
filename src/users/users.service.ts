import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
//import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  //jwtService: any;
    //repo: any;

  constructor(
    @InjectRepository(User)
        private usersRepo: Repository<User>,
        //private authService: AuthService,
        private jwtService: JwtService,
  ) {}
  

  async signup(createUserDto: CreateUserDto) {

    const { name, email,providerAccountId } = createUserDto;

    const userExists = await this.usersRepo.findOne({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException('Email already exists');
    }

    //const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepo.create({
      name,
      email,
      providerAccountId
      //password: hashedPassword,
    });

    //return this.usersRepo.save(user);
    const savedUser = await this.usersRepo.save(user);
    //const token = this.authService.generateToken(savedUser);
    const payload = { sub: savedUser.id, email: savedUser.email,name: savedUser.name };
    console.log('Generated JWT Payload:', payload);
    const token = this.jwtService.sign(payload);
    return {
      message: 'Logged In successfully',
      access_token: token,
      name: savedUser.name,
      email: savedUser.email,
    };
  }
  
}