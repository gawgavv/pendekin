import { Controller, Get, NotFoundException, Param, Redirect, Res } from '@nestjs/common';

import { UrlsService } from './urls/urls.service';
import { ClicksService } from './clicks/clicks.service';
import { CacheService } from './utils/cache.service';
import { Response } from 'express';

@Controller()
export class AppController {

    constructor(
        private readonly urlsService: UrlsService,
        private readonly clicksService: ClicksService,
        private readonly cacheService: CacheService
    ) {}

    @Redirect(``, 301)
    @Get(`:id`)
    async redirectToOriginalURL(@Param() { id }: { id: string }, @Res() res: Response): Promise<{ url: string }> {

        res.setHeader(`Cache-Control`, `max-age=0, no-cache, no-store, must-revalidate`) // this is only for development so it's easier to know the Click Service is working properly. In production it would be a good idea to comment or delete this header setting because the client's browser would automatically cached the redirected origin URL

        const originCache = await this.cacheService.getOriginCache(id);
        
        if(originCache) return { url: originCache };

        const { origin } = await this.urlsService.findOne(id);

        if(!origin) throw new NotFoundException(null, { description: `Short URL id not found` });

        const result = await this.clicksService.create({ urlId: id });

        return { url: origin }; // Request would be redirected to whatever returned from this method
    }
}
