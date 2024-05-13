import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Param,
  Query,
  Delete,
} from '@nestjs/common'
import { AuthGuard } from 'auth/auth.guard'
import { Permissions } from 'auth/permissions.decorator'
import { PermissionsGuard } from 'auth/permissions.guard'
import { Prisma } from '@prisma/client'
import { UsersService } from 'users/users.service'

@UseGuards(AuthGuard, PermissionsGuard)
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
  findFirst(@Param(`id`) id: string) {
    return this.usersService.findFirst({ id: Number(id) })
  }

  @Put(`:id`)
  update(
    @Param(`id`) id: string,
    @Query() input: Prisma.UserUpdateInput & { roleIDs: string },
  ) {
    return this.usersService.update(Number(id), input)
  }

  @Delete(`:id`)
  @Permissions([`user.delete`])
  delete(@Param(`id`) id: string) {
    return this.usersService.delete(Number(id))
  }
}
