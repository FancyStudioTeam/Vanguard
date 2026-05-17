import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { GuildController } from './Guild.controller.js';
import { TicketsModule } from './Tickets/Tickets.module.js';

@Module({
	controllers: [
		GuildController,
	],
	imports: [
		DiscordModule,
		SessionsModule,
		TicketsModule,
	],
})
export class GuildModule {}
