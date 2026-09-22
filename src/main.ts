import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
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
  const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('api/docs', app, document)
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
