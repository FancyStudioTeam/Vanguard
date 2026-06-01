import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { SessionEntity } from './Session.entity.js';

@Entity()
export class SessionCredentialsEntity {
	@Column({
		length: 512,
		type: 'string',
	})
	declare accessToken: string;

	@Column({
		type: 'date',
		utc: true,
	})
	declare createdAt: Date;

	@Column({
		length: 512,
		type: 'string',
	})
	declare refreshToken: string;

	@OneToMany(
		() => SessionEntity,
		(session) => session.userId,
	)
	declare sessions: SessionEntity[];

	@Column({
		length: 50,
		type: 'string',
	})
	declare tokenType: string;

	@Column({
		type: 'date',
		update: true,
		utc: true,
	})
	declare updatedAt: Date;

	@PrimaryColumn({
		length: 19,
		unique: true,
	})
	declare userId: string;
}
