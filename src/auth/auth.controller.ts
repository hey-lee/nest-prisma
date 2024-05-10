import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { AuthGuard } from 'auth/auth.guard'
import { AuthService } from 'auth/auth.service'

@Controller(`auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`signin`)
  signIn(@Query() { username, password }: Prisma.UserCreateInput) {
    console.log(username, password)
    return this.authService.signIn(username, password)
  }

  @Post(`signup`)
  async signUp(@Query() { username, password }: Prisma.UserCreateInput) {
    console.log(`signup`, username, password)
    return this.authService.signUp(username, password)
  }

  @UseGuards(AuthGuard)
  @Get(`profile`)
  getProfile(@Request() req) {
    return req.user
  }
}
