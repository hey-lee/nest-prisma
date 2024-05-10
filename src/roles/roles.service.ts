import { Injectable } from '@nestjs/common'
import { Role, Prisma } from '@prisma/client'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.RoleCreateInput) {
    return this.prisma.role.create({ data })
  }

  async findAll(
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.RoleWhereUniqueInput
      where?: Prisma.RoleWhereInput
      orderBy?: Prisma.RoleOrderByWithRelationInput
    } = {},
  ): Promise<Role[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async update(id: number, data: Prisma.RoleUpdateInput) {
    return this.prisma.role.update({
      where: {
        id: Number(id),
      },
      data,
    })
  }

  async delete(id: number) {
    return this.prisma.role.delete({
      where: {
        id: Number(id),
      },
    })
  }
}
