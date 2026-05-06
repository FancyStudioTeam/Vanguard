import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { EncryptionModule } from '#modules/Encryption/Encryption.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { AuthController } from './Auth.controller.js';

@Module({
	controllers: [
		AuthController,
	],
	imports: [
		DiscordModule,
		EncryptionModule,
		SessionsModule,
	],
})
export class AuthModule {}
