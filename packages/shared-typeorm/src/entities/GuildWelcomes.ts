import { Column, Entity, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity.js';

@Entity()
export class GuildWelcomesEntity extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: '19',
	})
	declare guildId: string;

	@Column('bytea', {
		default: Buffer.alloc(0),
	})
	declare yamlData: Buffer;
}
