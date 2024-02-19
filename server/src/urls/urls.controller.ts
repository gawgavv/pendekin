import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  async create(@Body() createUrlDto: CreateUrlDto): Promise<{ shortened: string }> {
    const shortenedUrlId =  await this.urlsService.create(createUrlDto);
    return { shortened: process.env.SERVER_HOST + shortenedUrlId }
  }
}
