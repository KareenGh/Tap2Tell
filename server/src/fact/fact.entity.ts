import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Fact as F } from '@hilma/data-nest';

@Entity()
export class Fact implements F {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'grain_id', type: 'uuid', precision: 11, nullable: true, default: null })
	grainId?: string;

	@Column({ name: 'ts', type: 'timestamp', precision: 6, nullable: true, default: null })
	ts: Date;

	@Column({ name: 'fact_type', type: 'varchar', length: 255, nullable: false })
	factType?: string;

	@Column({ name: 'fact_value', type: 'varchar', length: 255, nullable: true, default: null })
	factValue?: string;

	@Column({ name: 'fact_value_id', type: 'varchar', length: 36, nullable: true, default: null })
	factValueId?: string;
}