import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'João Silva',
  })

  @IsString()
  @MinLength(3)
  name!: string;

  @ApiProperty({
    example: 'joao@email.com',
  })

  @IsEmail()
  @IsString()
  email!: string;

 @ApiProperty({
    example: '123456',
  })

  @IsString()
  password!: string;
  
 @ApiProperty({
    example: 'ADMIN',
  })

  @IsString()
  role!: string;
}