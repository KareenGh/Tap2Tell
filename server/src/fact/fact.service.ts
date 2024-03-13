import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FactService as F } from '@hilma/data-nest';
import { Repository } from 'typeorm';

import { Fact } from './fact.entity';

@Injectable()
export class FactService extends F<Fact> {
	constructor(
		@InjectRepository(Fact)
		protected readonly factRepository: Repository<Fact>
	) {
		super();
	}
}