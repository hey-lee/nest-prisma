import { Module } from '@nestjs/common'
import { AuthService } from 'auth/auth.service'
import { AuthController } from 'auth/auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from 'users/users.module'
import { UsersService } from 'users/users.service'
import { JWT_SECRET } from 'auth/constants'
import { PrismaService } from 'prisma/prisma.service'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
    }),
  ],
  providers: [AuthService, UsersService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
