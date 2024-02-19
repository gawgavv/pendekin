import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlDto {

    @IsNotEmpty(
        {
            message: `Please enter the URL`
        }
    )
    @IsUrl(
        {},
        {
            message: `Invalid URL format`
        }
    )
    origin: string;
}
