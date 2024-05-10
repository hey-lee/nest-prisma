import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Permissions } from './permissions.decorator'
import { matchPermissions } from 'fns'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get(Permissions, context.getHandler())
    if (!permissions) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    console.log(request.user)
    return matchPermissions(permissions, user?.roles)
  }
}
