import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('session')
export class SessionEntity {
	@CreateDateColumn({
		type: 'timestamp',
		utc: true,
	})
	declare createdAt: Date;

	@Column('varchar', {
		length: 250,
	})
	declare discordAccessToken: string;

	@Column('varchar', {
		length: 50,
	})
	declare discordAccessTokenType: string;

	@Column('numeric')
	declare discordAccessTokenExpiresIn: number;

	@Column('varchar', {
		length: 250,
	})
	declare discordRefreshToken: string;

	@PrimaryColumn('varchar', {
		length: 64,
	})
	declare sessionId: string;

	@Column('varchar', {
		length: 19,
	})
	declare sessionUserId: string;

	@UpdateDateColumn({
		type: 'timestamp',
		update: true,
		utc: true,
	})
	declare updatedAt: Date;

	get isAccessTokenExpired(): boolean {
		return Date.now() >= this.discordAccessTokenExpiresIn;
	}
}
