import { last } from 'radash'
import { Response } from 'express'
import { Prisma } from '@prisma/client'
import { BaseExceptionFilter } from '@nestjs/core'
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const message = last(exception.message.split(`\n`))
    console.log(`exception`, message)

    switch (exception.code) {
      case `P2002`: {
        const status = HttpStatus.CONFLICT
        response.status(status).json({
          statusCode: status,
          message,
        })
        break
      }
      default:
        super.catch(exception, host)
        break
    }
  }
}
