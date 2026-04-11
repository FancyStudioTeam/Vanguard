import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { DiscordModule } from '#modules/Utils/Discord/Discord.module.js';
import { SessionsModule } from '#modules/Utils/Sessions/Sessions.module.js';
import { GuildsController } from './Guilds.controller.js';
import { GuildsService } from './Guilds.service.js';

@Module({
	controllers: [
		GuildsController,
	],
	imports: [
		CacheModule.register(),
		DiscordModule,
		SessionsModule,
	],
	providers: [
		GuildsService,
	],
})
export class GuildsModule {}
