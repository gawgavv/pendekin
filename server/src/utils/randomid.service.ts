import { Injectable } from '@nestjs/common';

import { nanoid } from 'nanoid';

@Injectable()
export class RandomIDService {

    genRandomID(length: number): string {
        return nanoid(length)
    }
}