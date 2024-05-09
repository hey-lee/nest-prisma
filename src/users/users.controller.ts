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

  @Get(`:id`)
  findOne(@Param(`id`) id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(`:id`)
  update(
    @Param(`id`) id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(`:id`)
  remove(@Param(`id`) id: string) {
    return this.usersService.remove(+id)
  }
}
