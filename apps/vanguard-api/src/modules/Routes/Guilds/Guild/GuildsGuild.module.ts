import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Utils/Discord/Discord.module.js';
import { SessionsModule } from '#modules/Utils/Sessions/Sessions.module.js';
import { GuildController } from './GuildsGuild.controller.js';

@Module({
	controllers: [
		GuildController,
	],
	imports: [
		DiscordModule,
		SessionsModule,
	],
})
export class GuildModule {}
