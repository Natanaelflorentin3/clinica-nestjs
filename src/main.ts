import { LoggingInterceptor } from './common/logging.interceptor'
import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
async function bootstrap() {
  const config = new DocumentBuilder()
  .setTitle('Clínica Salud Integral')
  .setDescription('API de la clínica, migrada a NestJS')
  .setVersion('1.0')
  .addBearerAuth()
  .build()
  
  
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalFilters(new PrismaExceptionFilter())
  app.useGlobalInterceptors(new LoggingInterceptor())
  const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('api/docs', app, document)
const configService = app.get(ConfigService)
await app.listen(configService.get<number>('PORT') as number)
}
void bootstrap();
