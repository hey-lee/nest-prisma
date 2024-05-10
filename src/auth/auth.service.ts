import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hashSync, compareSync } from 'bcryptjs'
import { UsersService } from 'users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<{ token: string }> {
    const user = await this.usersService.findUnique(username)
    if (!compareSync(password, user?.password)) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, username: user.username }
    return {
      token: await this.jwtService.signAsync(payload),
    }
  }

  async signUp(username: string, password: string) {
    return await this.usersService.create({
      username,
      password: hashSync(password, 10),
    })
  }
}
