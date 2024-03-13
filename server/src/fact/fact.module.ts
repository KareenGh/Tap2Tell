import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactController } from './fact.controller';

import { Fact } from './fact.entity';
import { FactService } from './fact.service';

@Module({
	imports: [TypeOrmModule.forFeature([Fact])],
	controllers: [FactController],
	providers: [FactService],
	exports: [FactService]
})
export class FactModule { }