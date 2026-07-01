import { Column, Entity } from 'typeorm';

import { BaseEntity } from './BaseEntity.js';

@Entity()
export class GuildWelcomesMessageEntity extends BaseEntity {
	@Column('boolean', {
		default: true,
	})
	declare isEnabled: boolean;

	@Column('jsonb')
	declare payload: unknown;
}
