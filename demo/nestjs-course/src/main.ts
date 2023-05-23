import { NestFactory } from '@nestjs/core';
import { PrismaService } from './core/database/prisma.service';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './core/exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get('port');

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
