import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from 'auth/auth.guard'
import { Prisma } from '@prisma/client'
import { RolesService } from 'roles/roles.service'

@UseGuards(AuthGuard)
@Controller(`roles`)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Query() input: Prisma.RoleCreateInput) {
    return this.rolesService.create(input)
  }

  @Get()
  findAll() {
    return this.rolesService.findAll()
  }

  @Put(`:id`)
  update(
    @Param(`id`) id: string,
    @Query() input: Prisma.RoleUpdateInput & { permissionIDs: string },
  ) {
    return this.rolesService.update(Number(id), input)
  }

  @Delete(`:id`)
  delete(@Param(`id`) id: string) {
    return this.rolesService.delete(Number(id))
  }
}
