import { Injectable } from '@nestjs/common'
import { Permission, Prisma } from '@prisma/client'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.PermissionCreateInput) {
    return this.prisma.permission.create({ data })
  }

  async findAll(
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.PermissionWhereUniqueInput
      where?: Prisma.PermissionWhereInput
      orderBy?: Prisma.PermissionOrderByWithRelationInput
    } = {},
  ): Promise<Permission[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.permission.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async update(id: number, data: Prisma.PermissionUpdateInput) {
    return this.prisma.permission.update({
      where: {
        id: Number(id),
      },
      data,
    })
  }

  async delete(id: number) {
    return this.prisma.permission.delete({
      where: {
        id: Number(id),
      },
    })
  }
}
