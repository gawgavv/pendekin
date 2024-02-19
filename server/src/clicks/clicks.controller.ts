import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClicksService } from './clicks.service';
import { CreateClickDto } from './dto/create-click.dto';
import { UpdateClickDto } from './dto/update-click.dto';

@Controller('clicks')
export class ClicksController {
  constructor(private readonly clicksService: ClicksService) {}
  @Get()
  findAll() {
    return this.clicksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clicksService.findOne(+id);
  }
}
