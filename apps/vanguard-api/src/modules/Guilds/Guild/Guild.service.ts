import type { APIGuild } from '@vanguard/api-contracts/interfaces';

import type { MultipartFile } from '@fastify/multipart';
import { Inject, Injectable } from '@nestjs/common';

import { DiscordService } from '#modules/Discord/Discord.service.js';
import { ParserService } from '#modules/Parser/Parser.service.js';

@Injectable()
export class GuildService {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(ParserService) private readonly parserService: ParserService,
	) {}

	public async getGuild(guildId: string): Promise<APIGuild> {
		const guild = await this.discordService.getGuild(guildId);
		const guildParsed = this.parserService.parseDiscordGuild(guild);

		return guildParsed;
	}

	public async updateBotProfile(
		guildId: string,
		{ avatarFile, bannerFile, biography, nickname }: UpdateBotProfileOptions,
	): Promise<void> {
		let avatar: string | null = null;
		let banner: string | null = null;

		if (avatarFile) {
			const avatarBuffer = await avatarFile.toBuffer();
			const avatarBufferBase64 = avatarBuffer.toString('base64');

			avatar = `data:${avatarFile.mimetype}/base64,${avatarBufferBase64}`;
		}

		if (bannerFile) {
			const bannerBuffer = await bannerFile.toBuffer();
			const bannerBufferBase64 = bannerBuffer.toString('base64');

			banner = `data:${bannerFile.mimetype}/base64,${bannerBufferBase64}`;
		}

		return await this.discordService.patchBotProfile(guildId, {
			avatar,
			banner,
			bio: biography,
			nick: nickname,
		});
	}
}

interface UpdateBotProfileOptions {
	avatarFile: MultipartFile | null;
	bannerFile: MultipartFile | null;
	biography: string | null;
	nickname: string | null;
}
