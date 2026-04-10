import { Module } from '@nestjs/common';
import { EncryptionModule } from '#modules/Encryption/Encryption.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { AuthController } from './Auth.controller.js';
import { AuthDiscordService } from './Auth.service.js';

@Module({
	controllers: [
		AuthController,
	],
	imports: [
		EncryptionModule,
		SessionsModule,
	],
	providers: [
		AuthDiscordService,
	],
})
export class AuthModule {}
