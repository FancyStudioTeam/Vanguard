import { Column, Entity, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './BaseEntity.js';

@Entity()
export class GuildBotProfile extends BaseEntity {
	@Column('bytea', {
		nullable: true,
	})
	declare avatar: Buffer | null;

	@Column('bytea', {
		nullable: true,
	})
	declare banner: Buffer | null;

	@Column('varchar', {
		length: '190',
		nullable: true,
	})
	declare biography: string | null;

	@PrimaryColumn('varchar', {
		length: '19',
	})
	declare guildId: string;
}
