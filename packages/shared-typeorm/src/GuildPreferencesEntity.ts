import { Entity, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity.js';

@Entity()
export class GuildPreferencesEntity extends BaseEntity {
	@PrimaryColumn('varchar', {
		length: '19',
	})
	declare guildId: string;
}
