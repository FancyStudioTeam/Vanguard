import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AUTH_SECRET } from '#lib/Constants/Auth.js';
import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { EncryptionModule } from '#modules/Encryption/Encryption.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { AuthController } from './Auth.controller.js';
import { AuthService } from './Auth.service.js';

const URL_BASE = 'https://vanguard.fancystudio.xyz';

const JSON_WEB_TOKEN_AUDIENCE = new URL('/api/', URL_BASE).toString();
const JSON_WEB_TOKEN_ISSUER = new URL('/', URL_BASE).toString();

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
		JwtModule.register({
			global: true,
			secret: AUTH_SECRET,
			signOptions: {
				algorithm: 'HS512',
				audience: JSON_WEB_TOKEN_AUDIENCE,
				issuer: JSON_WEB_TOKEN_ISSUER,
			},
			verifyOptions: {
				algorithms: [
					'HS512',
				],
				audience: JSON_WEB_TOKEN_AUDIENCE,
				issuer: JSON_WEB_TOKEN_ISSUER,
			},
		}),
		SessionsModule,
	],
	providers: [
		AuthService,
	],
})
export class AuthModule {}
