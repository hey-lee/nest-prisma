import { Module } from '@nestjs/common'
import { AppService } from 'app/app.service'
import { AppController } from 'app/app.controller'
import { AuthModule } from 'auth/auth.module'
import { UsersModule } from 'users/users.module'
import { RolesModule } from 'roles/roles.module'
import { PermissionsModule } from 'permissions/permissions.module'

@Module({
  imports: [AuthModule, UsersModule, RolesModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
