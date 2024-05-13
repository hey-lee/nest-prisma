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
import { Prisma } from '@prisma/client'
import { PermissionsService } from 'permissions/permissions.service'
import { AuthGuard } from 'auth/auth.guard'
import { PermissionsGuard } from 'auth/permissions.guard'

@UseGuards(AuthGuard, PermissionsGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly pmsService: PermissionsService) {}

  @Post()
  create(@Query() input: Prisma.PermissionCreateInput) {
    return this.pmsService.create(input)
  }

  @Get()
  findAll() {
    return this.pmsService.findAll()
  }

  @Put(`:id`)
  update(
    @Param('id') id: string,
    @Query() input: Prisma.PermissionUpdateInput,
  ) {
    return this.pmsService.update(Number(id), input)
  }

  @Delete(`:id`)
  delete(@Param('id') id: string) {
    return this.pmsService.delete(Number(id))
  }
}
