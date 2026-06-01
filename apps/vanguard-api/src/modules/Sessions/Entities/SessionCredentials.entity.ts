import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { SessionEntity } from './Session.entity.js';

@Entity()
export class SessionCredentialsEntity {
	@Column({
		length: 512,
		type: 'string',
	})
	declare readonly accessToken: string;

	@Column({
		type: 'date',
		utc: true,
	})
	declare readonly createdAt: Date;

	@Column({
		length: 512,
		type: 'string',
	})
	declare readonly refreshToken: string;

	@OneToMany(
		() => SessionEntity,
		(session) => session.userId,
	)
	declare readonly sessions: SessionEntity[];

	@Column({
		type: 'date',
		update: true,
		utc: true,
	})
	declare readonly updatedAt: Date;

	@PrimaryColumn({
		length: 19,
		unique: true,
	})
	declare readonly userId: string;
}
