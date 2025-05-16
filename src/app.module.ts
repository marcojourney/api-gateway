import { 
  ExecutionContext,
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, seconds } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { APP_GUARD } from '@nestjs/core';
import * as http from 'http';
import * as https from 'https';

import { Session, Config } from '@entities/index';
import { StockHttpService } from '@services/index';
import { ConfigGateway } from './common/config/config.gateway';
import { HeaderFilterMiddleware } from '@middlewares/index';
import { AdvancedThrottlerGuard } from '@common/guards/advanced-throttler.guard';
import { AppController, ConfigController, StockProxyController } from '@controllers/index';

@Module({
  imports: [
    CacheModule.register({ ttl: 5000 }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        getTracker: (req: Record<string, any>, context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          /**
           * If x-api-key is present, rate limit by that.
           * Else, use user.id.
           * Fallback to IP address.
          */
          return request.headers['x-api-key'] || request.user?.id || request.ip;
        },
        throttlers: [
          {
            ttl: seconds(config.get('THROTTLE_TTL')),
            limit: config.get('THROTTLE_LIMIT'),
          },
        ],
        storage: new ThrottlerStorageRedisService({
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
          password: config.get<string>('REDIS_PASSWORD'),
          username: config.get<string>('REDIS_USERNAME'),
          db: config.get<number>('REDIS_DB') || 0,
        }),
      })
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        timeout: config.get('HTTP_TIMEOUT'),
        maxRedirects: config.get('HTTP_MAX_REDIRECTS'),
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Session,
        Config
      ],
      synchronize: true,
      logging: true,
      retryAttempts: 10,
      retryDelay: 3000
    }),
    TypeOrmModule.forFeature([Config]),
    HttpModule
  ],
  controllers: [
    AppController,
    ConfigController,
    StockProxyController
  ],
  providers: [
    ConfigGateway,
    StockHttpService,
    {
      provide: APP_GUARD,
      useClass: AdvancedThrottlerGuard,
    }
  ],
  exports: [
    StockHttpService
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HeaderFilterMiddleware)
      .forRoutes('*');
  }
}
