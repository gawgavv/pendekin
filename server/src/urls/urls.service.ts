import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm';

import { RandomIDService } from 'src/utils/randomid.service';
import { Url } from './entities/url.entity';

import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Injectable()
export class UrlsService {

  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
    private readonly randomIdService: RandomIDService
  ) {}

  async create({ origin }: CreateUrlDto): Promise<string> {

    let checkId: boolean = true;
    let shortId: string = this.randomIdService.genRandomID(7); // This particular package default is configured with base 64 [a-zA-Z0-9], it would produce ~4.3 trillion possible combinations. And assuming this monolithic server accepts 1000 requests/second non-stop it would take 80329 years until it runs out of ID(in short, the possibility of collisions is quite low).

    while(checkId) { // This loop performs a checking whether the-generated-shortid already exists in database, although probability of collisions is low, better be safe
      const shortUrlId = await this.urlRepository.findOne({ select: [`id`], where: { id: shortId } });
      if(!shortUrlId) {
        checkId = false;
      } else {
        shortId = this.randomIdService.genRandomID(7);
      }
    }

    const newShortUrl = this.urlRepository.create({ origin, id: shortId });
    const { id } = await this.urlRepository.save(newShortUrl);
    return id;
  }

  findAll() {
    return `This action returns all urls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }
}
