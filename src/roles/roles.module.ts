import { Module } from '@nestjs/common'
import { RolesService } from 'roles/roles.service'
import { RolesController } from 'roles/roles.controller'
import { PrismaService } from 'prisma/prisma.service'

@Module({
  providers: [RolesService, PrismaService],
  controllers: [RolesController],
})
export class RolesModule {}
