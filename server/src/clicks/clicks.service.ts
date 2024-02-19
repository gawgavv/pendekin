import { Injectable } from '@nestjs/common';
import { CreateClickDto } from './dto/create-click.dto';
import { UpdateClickDto } from './dto/update-click.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Click } from './entities/click.entity';

@Injectable()
export class ClicksService {

  constructor(
    @InjectRepository(Click) private readonly clicksRepository: Repository<Click>
  ) {}

  async create({ urlId }: CreateClickDto) {

    const newClick = this.clicksRepository.create({ urlId });
    return await this.clicksRepository.save(newClick);
  }

  findAll() {
    return `This action returns all clicks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} click`;
  }
}
