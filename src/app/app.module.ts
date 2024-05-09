import { Module } from '@nestjs/common'
import { AppService } from 'app/app.service'
import { AppController } from 'app/app.controller'

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
