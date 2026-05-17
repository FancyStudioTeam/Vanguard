import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { DiscordUtilsModule } from '#modules/DiscordUtils/DiscordUtils.module.js';
import { PrismaModule } from '#modules/Prisma/Prisma.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { TicketsController } from './Tickets.controller.js';
import { TicketsService } from './Tickets.service.js';

@Module({
	controllers: [
		TicketsController,
	],
	imports: [
		DiscordModule,
		DiscordUtilsModule,
		PrismaModule,
		SessionsModule,
	],
	providers: [
		TicketsService,
	],
})
export class TicketsModule {}
