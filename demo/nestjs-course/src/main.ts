import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './core/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get('port');

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
}
bootstrap().catch((err) => console.log('Crashed! ', err));
