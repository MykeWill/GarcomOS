import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {email: createUserDto.email}
    })

    if (userExists) {
      throw new ConflictException(`Esse email já está cadastrado`)
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt)

    const newUser = await this.prisma.user.create({
      data:{
        ...createUserDto, 
        password: hashedPassword
      } 
    }) 
    
    const {password, ...result} = newUser
    return result
  }

  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true }
    });
  }

  async findOne(id: number) {
    const user  = await this.prisma.user.findUnique({
      where: {id},
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })

    if(!user) {
      throw new NotFoundException('Usuário não encontrado ')
    }

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {id}
    })

    if(!user) {
      throw new NotFoundException('usuário não encontrado')
    }

    const data = {... updateUserDto}

    if(updateUserDto.password) {
      const salt = await bcrypt.genSalt()
      data.password = await bcrypt.hash(updateUserDto.password, salt)
    }

    const updateUser = await this.prisma.user.update({
      where : {id},
      data
    })

    const {password, ...result} = updateUser

    return result
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
