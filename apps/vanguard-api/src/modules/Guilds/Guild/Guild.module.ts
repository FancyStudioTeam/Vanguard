import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { ParserModule } from '#modules/Parser/Parser.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { GuildController } from './Guild.controller.js';

@Module({
	controllers: [
		GuildController,
	],
	imports: [
		DiscordModule,
		SessionsModule,
		ParserModule,
	],
})
export class GuildModule {}
