import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UrlsModule } from './urls/urls.module';
import { ClicksModule } from './clicks/clicks.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    UrlsModule,
    ClicksModule,
    ConfigModule.forRoot()
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export class AppModule {}
