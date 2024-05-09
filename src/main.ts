import { NestFactory, HttpAdapterHost } from '@nestjs/core'
import { AppModule } from 'app/app.module'
import { PrismaExceptionFilter } from 'prisma/exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter))
  await app.listen(3000)
}
bootstrap()
