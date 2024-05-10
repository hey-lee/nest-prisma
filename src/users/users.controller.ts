import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { UsersService } from 'users/users.service'

@Controller(`users`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Query() input: Prisma.UserCreateInput) {
    return this.usersService.create(input)
  }

  @Get()
  findAll() {
    return this.usersService.users()
  }
}
