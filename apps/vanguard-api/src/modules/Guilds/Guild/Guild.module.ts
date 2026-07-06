import { GuildWelcomesEntity } from '@vanguard/shared-typeorm/GuildWelcomesEntity.js';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscordModule } from '#modules/Discord/Discord.module.js';
import { ParserModule } from '#modules/Parser/Parser.module.js';
import { GuildController } from './Guild.controller.js';
import { GuildService } from './Guild.service.js';

@Module({
	controllers: [
		GuildController,
	],
	imports: [
		DiscordModule,
		ParserModule,
		TypeOrmModule.forFeature([
			GuildWelcomesEntity,
		]),
	],
	providers: [
		GuildService,
	],
})
export class GuildModule {}
