import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
	SESSIONS_DATABASE_HOST,
	SESSIONS_DATABASE_NAME,
	SESSIONS_DATABASE_PORT,
	SESSIONS_DATABASE_USER_NAME,
	SESSIONS_DATABASE_USER_PASSWORD,
} from '#lib/Constants/Sessions.js';
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
		TypeOrmModule.forFeature(
			[
				SessionCredentialsEntity,
				SessionEntity,
			],
			{
				database: SESSIONS_DATABASE_NAME,
				host: SESSIONS_DATABASE_HOST,
				password: SESSIONS_DATABASE_USER_PASSWORD,
				port: Number(SESSIONS_DATABASE_PORT),
				synchronize: true,
				type: 'postgres',
				username: SESSIONS_DATABASE_USER_NAME,
			},
		),
	],
	providers: [
		SessionsService,
	],
})
export class SessionsModule {}
