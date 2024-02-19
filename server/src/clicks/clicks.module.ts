import { Module } from '@nestjs/common';
import { ClicksService } from './clicks.service';
import { ClicksController } from './clicks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Click } from './entities/click.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Click])
  ],
  controllers: [
    ClicksController
  ],
  providers: [
    ClicksService
  ],
  exports: [
    ClicksService
  ]
})
export class ClicksModule {}
