import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';

import { RedisClientOptions } from 'redis'
import { redisStore } from 'cache-manager-redis-yet';

import { UrlsModule } from './urls/urls.module';
import { ClicksModule } from './clicks/clicks.module';

import { Url } from './urls/entities/url.entity';
import { Click } from './clicks/entities/click.entity';

import { AppController } from './app.controller';
import { CacheService } from './utils/cache.service';

@Module({
  imports: [
    UrlsModule,
    ClicksModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: `postgres`,
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Url, Click],
      logging: true,
      synchronize: true
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      password: process.env.CACHE_PASS,
      socket: {
        host: process.env.CACHE_HOST,
        port: +process.env.CACHE_PORT
      }
    }),
    ScheduleModule.forRoot()
  ],
  controllers: [
    AppController
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    },
    CacheService
  ],
})
export class AppModule {}
