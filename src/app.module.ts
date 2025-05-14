import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as http from 'http';
import * as https from 'https';

import { StockProxyController } from './stock.proxy.controller';
import { Session, Config } from './entities';
import { StockHttpService } from './services/stock-client.service';
import { ConfigGateway } from './common/config/config.gateway';
import { HeaderFilterMiddleware } from './common/middleware/header-filter.middleware';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
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
    StockProxyController
  ],
  providers: [
    ConfigGateway,
    StockHttpService
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
