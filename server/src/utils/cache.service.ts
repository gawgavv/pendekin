import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cron } from '@nestjs/schedule';

import { RedisCache } from 'cache-manager-redis-yet';

import { ClicksService } from 'src/clicks/clicks.service';
import { UrlsService } from 'src/urls/urls.service';

@Injectable()
export class CacheService {
    CACHE_KEY = `shortUrl:origin`;

    constructor(
        @Inject(CACHE_MANAGER) private cacheService: RedisCache,
        private readonly urlsService: UrlsService,
        private readonly clicksService: ClicksService
    ) {}
    
    @Cron(`* * */12 * * *`) // This means this method will run every 12 hours
    async cacheDataPer12Hour() {

        const todayClicks = await this.clicksService.getTodayClicks()

        let hashFormClick = {}

        todayClicks.forEach(({ urlId, origin }) => hashFormClick[urlId] = origin)
        console.log(hashFormClick)

        await this.cacheService.store.client.DEL(this.CACHE_KEY);
        await this.cacheService.store.client.HSET(this.CACHE_KEY, hashFormClick); // Using hash data structure(similar to object in javascript) to store urlId and originUrl in cache because of it maps to relation between urlId as the key and originUrl the value which the requests is going to get redirected to. Also hash data structure time complexity is O(1) (according to the documentation on redis).
    }

    async getOriginCache(shortUrlId: string): Promise<string | null> {
        return await this.cacheService.store.client.HGET(this.CACHE_KEY, shortUrlId);
    }
}