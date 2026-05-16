import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { UserService } from '#modules/User/User.service.js';
import { DiscordService } from './Discord.service.js';

@Module({
	exports: [
		DiscordService,
	],
	imports: [
		CacheModule.register(),
		UserService,
	],
	providers: [
		DiscordService,
	],
})
export class DiscordModule {}
