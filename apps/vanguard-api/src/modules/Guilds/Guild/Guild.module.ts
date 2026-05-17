import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { DiscordUtilsModule } from '#modules/DiscordUtils/DiscordUtils.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { GuildController } from './Guild.controller.js';
import { TicketsModule } from './Tickets/Tickets.module.js';

@Module({
	controllers: [
		GuildController,
	],
	imports: [
		DiscordModule,
		DiscordUtilsModule,
		SessionsModule,
		TicketsModule,
	],
})
export class GuildModule {}
