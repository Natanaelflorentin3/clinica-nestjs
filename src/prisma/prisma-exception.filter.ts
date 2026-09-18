import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, NotFoundException } from '@nestjs/common'
import { Prisma } from '../generated/prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    switch (exception.code) {
      case 'P2002': {
        const conflict = new ConflictException('Ya existe un registro con ese valor único')
        return response.status(conflict.getStatus()).json(conflict.getResponse())
      }
      case 'P2025': {
        const notFound = new NotFoundException('Registro no encontrado')
        return response.status(notFound.getStatus()).json(notFound.getResponse())
      }
      default:
        throw exception
    }
  }
}