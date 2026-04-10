import { Module } from '@nestjs/common';
import { EncryptionModule } from '#modules/Encryption/Encryption.module.js';
import { SessionsService } from './Sessions.service.js';

@Module({
	exports: [
		SessionsService,
	],
	imports: [
		EncryptionModule,
	],
	providers: [
		SessionsService,
	],
})
export class SessionsModule {}
