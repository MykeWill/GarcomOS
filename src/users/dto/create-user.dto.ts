import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  role!: string;
}