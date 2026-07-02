import type { WelcomesSchemaDto } from '@vanguard/contracts/modules';

import { Column, Entity, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity.js';

@Entity()
export class GuildWelcomesEntity extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: '19',
	})
	declare guildId: string;

	@Column('jsonb', {
		default: '{}',
	})
	declare yamlData: WelcomesSchemaDto;
}
