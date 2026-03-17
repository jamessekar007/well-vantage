import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  providerAccountId: string;
}