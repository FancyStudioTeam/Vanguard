import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { EncryptionModule } from '#modules/Encryption/Encryption.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { AuthController } from './Auth.controller.js';
import { AuthService } from './Auth.service.js';

@Module({
	controllers: [
		AuthController,
	],
	exports: [
		AuthService,
	],
	imports: [
		DiscordModule,
		EncryptionModule,
		SessionsModule,
	],
	providers: [
		AuthService,
	],
})
export class AuthModule {}
