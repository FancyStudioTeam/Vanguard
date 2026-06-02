import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';

import { SessionEntity } from './Session.entity.js';

@Entity('session_credentials')
export class SessionCredentialsEntity {
	@Column({
		length: 250,
		type: 'varchar',
	})
	declare accessToken: string;

	@CreateDateColumn({
		type: 'timestamp',
		utc: true,
	})
	declare createdAt: Date;

	@Column({
		length: 250,
		type: 'varchar',
	})
	declare refreshToken: string;

	@OneToMany(
		() => SessionEntity,
		(session) => session.credentials,
	)
	declare sessions: SessionEntity[];

	@Column({
		length: 50,
		type: 'varchar',
	})
	declare tokenType: string;

	@UpdateDateColumn({
		type: 'timestamp',
		update: true,
		utc: true,
	})
	declare updatedAt: Date;

	@PrimaryColumn({
		length: 19,
		type: 'varchar',
	})
	declare userId: string;
}
