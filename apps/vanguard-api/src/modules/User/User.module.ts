import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { DiscordUtilsModule } from '#modules/DiscordUtils/DiscordUtils.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { UserController } from './User.controller.js';
import { UserService } from './User.service.js';

@Module({
	controllers: [
		UserController,
	],
	exports: [
		UserService,
	],
	imports: [
		DiscordModule,
		DiscordUtilsModule,
		SessionsModule,
	],
	providers: [
		UserService,
	],
})
export class UserModule {}
