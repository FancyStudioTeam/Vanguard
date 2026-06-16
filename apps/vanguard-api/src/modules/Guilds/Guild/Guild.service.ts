import type { DiscordGuild } from '@vanguard/api-contracts/interfaces';

import { Inject, Injectable } from '@nestjs/common';

import { DiscordService } from '#modules/Discord/Discord.service.js';
import { ParserService } from '#modules/Parser/Parser.service.js';

@Injectable()
export class GuildService {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(ParserService) private readonly parserService: ParserService,
	) {}

	public async getGuild(guildId: string): Promise<DiscordGuild> {
		const guild = await this.discordService.getGuild(guildId);
		const guildParsed = this.parserService.parseDiscordGuild(guild);

		return guildParsed;
	}
}
