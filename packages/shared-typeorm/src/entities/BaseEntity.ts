import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
	@CreateDateColumn({
		type: 'timestamp',
		utc: true,
	})
	declare createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		utc: true,
	})
	declare updatedAt: Date;
}
