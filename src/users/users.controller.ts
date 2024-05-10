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

@UseGuards(AuthGuard)
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
