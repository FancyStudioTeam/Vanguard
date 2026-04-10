import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { DiscordModule } from '#modules/Utils/Discord/Discord.module.js';
import { EncryptionModule } from '#modules/Utils/Encryption/Encryption.module.js';
import { SessionsModule } from '#modules/Utils/Sessions/Sessions.module.js';
import { AuthController } from './Auth.controller.js';
import { AuthService } from './Auth.service.js';

@Module({
	controllers: [
		AuthController,
	],
	imports: [
		CacheModule.register(),
		DiscordModule,
		EncryptionModule,
		SessionsModule,
	],
	providers: [
		AuthService,
	],
})
export class AuthModule {}
