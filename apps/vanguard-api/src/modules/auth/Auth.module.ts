import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller.js';
import { AuthDiscordService, AuthService } from './Auth.service.js';

@Module({
	controllers: [
		AuthController,
	],
	providers: [
		AuthDiscordService,
		AuthService,
	],
})
export class AuthModule {}
