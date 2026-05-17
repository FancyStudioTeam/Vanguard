import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { DiscordUtilsModule } from '#modules/DiscordUtils/DiscordUtils.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { GuildController } from './Guild.controller.js';

@Module({
	controllers: [
		GuildController,
	],
	imports: [
		DiscordModule,
		DiscordUtilsModule,
		SessionsModule,
	],
})
export class GuildModule {}
