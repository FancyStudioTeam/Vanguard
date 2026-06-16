import { Module } from '@nestjs/common';

import { AuthModule } from '#modules/Auth/Auth.module.js';
import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { ParserModule } from '#modules/Parser/Parser.module.js';
import { GuildModule } from './Guild/Guild.module.js';
import { GuildsController } from './Guilds.controller.js';
import { GuildsService } from './Guilds.service.js';

@Module({
	controllers: [
		GuildsController,
	],
	imports: [
		AuthModule,
		DiscordModule,
		GuildModule,
		ParserModule,
	],
	providers: [
		GuildsService,
	],
})
export class GuildsModule {}
