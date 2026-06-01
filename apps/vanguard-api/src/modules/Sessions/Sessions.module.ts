import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EncryptionModule } from '../Encryption/Encryption.module.js';
import { SessionEntity } from './Entities/Session.entity.js';
import { SessionCredentialsEntity } from './Entities/SessionCredentials.entity.js';
import { SessionsService } from './Sessions.service.js';

@Module({
	exports: [
		SessionsService,
	],
	imports: [
		EncryptionModule,
		TypeOrmModule.forFeature([
			SessionCredentialsEntity,
			SessionEntity,
		]),
	],
	providers: [
		SessionsService,
	],
})
export class SessionsModule {}
