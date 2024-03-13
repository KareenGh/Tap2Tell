import { Body, Controller, Post } from '@nestjs/common';
import { FactService } from './fact.service';


@Controller('/api/fact')
export class FactController {
    constructor(private readonly factService: FactService) { }

    @Post('add-fact')
    addFact(@Body() fact) {
        return this.factService.createFact(fact);
    }
}
