import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

import { SessionCredentialsEntity } from './SessionCredentials.entity.js';

@Entity()
export class SessionEntity {
	@Column({
		type: 'date',
		utc: true,
	})
	declare readonly createdAt: Date;

	@OneToOne(
		() => SessionCredentialsEntity,
		(sessionCredentials) => sessionCredentials.userId,
	)
	declare readonly credentials: SessionCredentialsEntity;

	@PrimaryColumn({
		length: 64,
		type: 'string',
	})
	declare readonly sessionId: string;

	@Column({
		type: 'date',
		update: true,
		utc: true,
	})
	declare readonly updatedAt: Date;

	@Column({
		length: 19,
		type: 'string',
	})
	declare readonly userId: string;
}
