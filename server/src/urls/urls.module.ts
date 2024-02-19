import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { RandomIDService } from '../utils/randomid.service';

import { Url } from './entities/url.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Url])
  ],
  controllers: [
    UrlsController
  ],
  providers: [
    UrlsService,
    RandomIDService
  ],
  exports: [
    UrlsService
  ]
})
export class UrlsModule {}
