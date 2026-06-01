import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

import { SessionCredentialsEntity } from './SessionCredentials.entity.js';

@Entity('session')
export class SessionEntity {
	@Column({
		type: 'date',
		utc: true,
	})
	declare createdAt: Date;

	@OneToOne(
		() => SessionCredentialsEntity,
		(sessionCredentials) => sessionCredentials.userId,
	)
	declare credentials: SessionCredentialsEntity;

	@PrimaryColumn({
		length: 64,
		type: 'varchar',
	})
	declare sessionId: string;

	@Column({
		type: 'date',
		update: true,
		utc: true,
	})
	declare updatedAt: Date;

	@Column({
		length: 19,
		type: 'varchar',
	})
	declare userId: string;
}
