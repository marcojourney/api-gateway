import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { TraceIdMiddleware } from './common/middleware/trace-id.middleware';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new TraceIdMiddleware().use);
  app.use(compression());
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  await app.listen(8080);
}
bootstrap();
