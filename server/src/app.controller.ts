import { Controller, Get, NotFoundException, Param, Redirect } from '@nestjs/common';

import { UrlsService } from './urls/urls.service';
import { ClicksService } from './clicks/clicks.service';

@Controller()
export class AppController {

    constructor(
        private readonly urlsService: UrlsService,
        private readonly clicksService: ClicksService
    ) {}

    @Redirect(``, 301)
    @Get(`:id`)
    async redirectToOriginalURL(@Param() { id }: { id: string }): Promise<{ url: string }> {

        const { origin } = await this.urlsService.findOne(id);

        if(!origin) throw new NotFoundException(null, { description: `Short URL id not found` });

        const result = await this.clicksService.create({ urlId: id });

        return { url: origin };
    }
}
