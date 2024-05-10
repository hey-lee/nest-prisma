import { Injectable } from '@nestjs/common'
import { User, Prisma } from '@prisma/client'
import { PrismaService } from 'prisma/prisma.service'
import { hashSync } from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data })
  }

  async users(
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.UserWhereUniqueInput
      where?: Prisma.UserWhereInput
      orderBy?: Prisma.UserOrderByWithRelationInput
    } = {},
  ): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findFirst(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
      include: {
        roles: true,
      },
    })
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    data.password = hashSync(data.password, 10)
    return this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data,
    })
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    })
  }
}
