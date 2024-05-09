import { Module } from '@nestjs/common'
import { AppService } from 'app/app.service'
import { AppController } from 'app/app.controller'
import { UsersModule } from 'users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
