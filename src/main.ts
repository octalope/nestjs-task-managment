import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(PinoLogger));
  app.useGlobalPipes(new ValidationPipe());
  const port = 3000;
  await app.listen(port);
  const logger = new Logger('app');

  logger.log({ port }, 'Server Listening');

  logger.fatal('FATAL');
  logger.error('ERROR');
  logger.warn('WARN');
  logger.log('LOG');
  logger.debug('DEBUG');
  logger.verbose('VERBOSE');
}
bootstrap();
