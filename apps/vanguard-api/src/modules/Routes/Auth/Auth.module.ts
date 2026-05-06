import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Utils/Discord/Discord.module.js';
import { EncryptionModule } from '#modules/Utils/Encryption/Encryption.module.js';
import { SessionsModule } from '#modules/Utils/Sessions/Sessions.module.js';
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
