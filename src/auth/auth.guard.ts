import { getParams } from 'fns'
import { Request } from 'express'
import { JWT_SECRET } from 'auth/constants'
import { JwtService } from '@nestjs/jwt'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.getToken(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      })
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request[`user`] = payload
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private getToken(request: Request): string | null {
    return this.tokenFromURL(request) || this.tokenFromHeader(request)
  }

  private tokenFromURL(request: Request): string | null {
    return getParams(request.url).get(`token`)
  }

  private tokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(` `) ?? []
    return type === `Bearer` ? token : null
  }
}
