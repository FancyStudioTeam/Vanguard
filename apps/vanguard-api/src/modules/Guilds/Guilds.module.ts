import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { DiscordUtilsModule } from '#modules/DiscordUtils/DiscordUtils.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { GuildsController } from './Guilds.controller.js';
import { GuildsService } from './Guilds.service.js';

@Module({
	controllers: [
		GuildsController,
	],
	imports: [
		CacheModule.register(),
		DiscordModule,
		DiscordUtilsModule,
		SessionsModule,
	],
	providers: [
		GuildsService,
	],
})
export class GuildsModule {}
