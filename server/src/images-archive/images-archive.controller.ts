import { Body, Controller, Post } from '@nestjs/common';
import { ImagesArchiveService} from './images-archive.service'

@Controller('api/images-archive')
export class ImagesArchiveController {
    constructor(private readonly imageArchiveService: ImagesArchiveService) { }

}
