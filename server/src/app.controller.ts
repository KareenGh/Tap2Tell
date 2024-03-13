import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// todo delete app controller
@Controller('/api/app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}
