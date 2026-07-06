import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
	@CreateDateColumn({
		type: 'timestamp',
		utc: true,
	})
	declare createdTimestamp: string;

	@UpdateDateColumn({
		type: 'timestamp',
		utc: true,
	})
	declare updatedTimestamp: string;

	get createdAt(): Date {
		return new Date(this.createdTimestamp);
	}

	get updatedAt(): Date {
		return new Date(this.updatedTimestamp);
	}
}
