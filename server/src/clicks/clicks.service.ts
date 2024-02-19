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

  async getTotalClicks(urlId: string): Promise<{ totalClicks: number, shortened: string }> {
    const [clicks, totalClicks] =  await this.clicksRepository.findAndCount({
      where: {
        urlId
      }
    });
    console.log(totalClicks);
    return { totalClicks, shortened: process.env.SERVER_HOST + urlId }
  }

  async getTodayClicks(): Promise<{ count: string, urlId: string, origin: string }[]> { // If today's clicked URLs is less than 50 urls then just cached every single of it, if it not just cache 10% of the clicked urls(50 urls and 10% is just random number I picked because it's not too many and still maintainable as a cache).

    const { count: todaysClickedUrls } = await this.todaysClickedUrls();

    let limit = 50;
    if(todaysClickedUrls > limit) limit = Math.floor(todaysClickedUrls * 0.1);
    console.log(limit)

    const todayClicks = await this.clicksRepository.query(`
    SELECT COUNT(c."urlId"), c."urlId", u.origin 
    FROM "Clicks" c 
    JOIN "Urls" u ON u."id" = c."urlId" 
    WHERE c."createdAt" >= CURRENT_DATE 
    GROUP BY "urlId", origin
    ORDER BY COUNT(c."urlId") DESC
    LIMIT $1;
    `, [limit]);

    return todayClicks
  }

  async todaysClickedUrls(): Promise<{ count: number }> {

    const [clickedUrls] = await this.clicksRepository.query(`
    SELECT COUNT(DISTINCT "urlId") 
    FROM "Clicks" 
    WHERE "createdAt" >= CURRENT_DATE;
    `)

    return clickedUrls;
  }
}
