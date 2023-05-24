import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import {
  INestApplication,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { PrismaService } from './core/database/prisma.service';
import { PrismaClientExceptionFilter } from './core/exception/prisma-client-exception.filter';
import { HttpExceptionFilter } from './core/exception/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.use(compression());

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get('port');

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownWebhooks(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('NestJS Course')
    .setDescription('A Basic NestJS Course')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/document', app, document);

  await app.listen(port);
}
bootstrap().catch((err) => console.log('Crashed! ', err));
