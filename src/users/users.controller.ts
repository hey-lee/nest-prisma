import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common'
import { AuthGuard } from 'auth/auth.guard'
import { Prisma } from '@prisma/client'
import { UsersService } from 'users/users.service'

@Controller(`users`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Query() input: Prisma.UserCreateInput) {
    return this.usersService.create(input)
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.users()
  }
}
