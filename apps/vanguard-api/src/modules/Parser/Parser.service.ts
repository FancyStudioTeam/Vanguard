import type {
	DiscordGuild,
	DiscordGuildChannel,
	DiscordUser,
	DiscordUserGuild,
	PrismaGuildTicketPanel,
	PrismaGuildTicketsConfiguration,
} from '@vanguard/api-contracts/interfaces';
import type { GuildTicketPanel, GuildTicketsConfiguration } from '@vanguard/prisma';

import { Injectable } from '@nestjs/common';
import type {
	APIGuild,
	APIGuildChannel,
	APIUser,
	RESTAPIPartialCurrentUserGuild,
} from 'discord-api-types/v10';

@Injectable()
export class ParserService {
	public parseDiscordGuildChannel({ id, name, type }: APIGuildChannel): DiscordGuildChannel {
		return {
			id,
			name,
			type,
		};
	}

	public parseDiscordGuildChannels(
		discordGuildChannels: APIGuildChannel[],
	): DiscordGuildChannel[] {
		return discordGuildChannels.map(this.parseDiscordGuildChannel);
	}

	public parseDiscordGuild({ banner, icon, id, name, owner_id }: APIGuild): DiscordGuild {
		return {
			banner,
			icon,
			id,
			name,
			owner_id,
		};
	}

	public parseDiscordUser({ avatar, global_name, id, username }: APIUser): DiscordUser {
		return {
			avatar,
			global_name,
			id,
			username,
		};
	}

	public parseDiscordUserGuild({
		banner,
		icon,
		id,
		name,
		permissions,
	}: RESTAPIPartialCurrentUserGuild): DiscordUserGuild {
		return {
			banner,
			icon,
			id,
			name,
			permissions,
		};
	}

	public parseDiscordUserGuilds(
		discordUserGuilds: RESTAPIPartialCurrentUserGuild[],
	): DiscordUserGuild[] {
		return discordUserGuilds.map(this.parseDiscordUserGuild);
	}

	public parseGuildTicketPanel({
		channelId,
		channelParentId,
		enabled,
		panelId,
		title,
		type,
	}: GuildTicketPanel): PrismaGuildTicketPanel {
		return {
			channel_id: channelId,
			channel_parent_id: channelParentId,
			enabled,
			panel_id: panelId,
			title,
			type,
		};
	}

	public parseGuildTicketPanels(guildTicketPanels: GuildTicketPanel[]): PrismaGuildTicketPanel[] {
		return guildTicketPanels.map(this.parseGuildTicketPanel);
	}

	public parseGuildTicketsConfiguration({
		enabled,
		panels,
	}: GuildTicketsConfiguration & {
		panels: GuildTicketPanel[];
	}): PrismaGuildTicketsConfiguration {
		return {
			enabled,
			panels: this.parseGuildTicketPanels(panels),
		};
	}
}
