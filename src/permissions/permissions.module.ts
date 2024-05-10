import { Module } from '@nestjs/common'
import { PermissionsService } from 'permissions/permissions.service'
import { PermissionsController } from 'permissions/permissions.controller'
import { PrismaService } from 'prisma/prisma.service'

@Module({
  providers: [PermissionsService, PrismaService],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
