import { Module } from '@nestjs/common';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { ParserModule } from '#modules/Parser/Parser.module.js';
import { SessionsModule } from '#modules/Sessions/Sessions.module.js';
import { GuildModule } from './Guild/Guild.module.js';
import { GuildsController } from './Guilds.controller.js';

@Module({
	controllers: [
		GuildsController,
	],
	imports: [
		DiscordModule,
		GuildModule,
		ParserModule,
		SessionsModule,
	],
})
export class GuildsModule {}
