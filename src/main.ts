import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { TraceIdMiddleware } from '@middlewares/index';
import { LoggingInterceptor, MaskingInterceptor } from '@interceptors/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://127.0.0.1',
      'http://ca.localhost:3000'
    ],
    methods: 'GET,POST,PUT,DELETE,PATCH'
  });
  
  app.use(new TraceIdMiddleware().use);
  app.use(compression());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new MaskingInterceptor()
  );
  
  await app.listen(8080);
}
bootstrap();
