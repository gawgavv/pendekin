import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { RedisClientOptions } from 'redis'
import { redisStore } from 'cache-manager-redis-yet';

import { UrlsModule } from './urls/urls.module';
import { ClicksModule } from './clicks/clicks.module';

import { Url } from './urls/entities/url.entity';
import { Click } from './clicks/entities/click.entity';

import { AppController } from './app.controller';

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
    })
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export class AppModule {}
