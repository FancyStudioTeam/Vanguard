import type { APIGuild, APIGuildTicketPanel, APIGuildTicketsConfiguration, APIUser, APIUserGuild } from '@vanguard/api-types/interfaces';
import type { GuildTicketPanel, GuildTicketsConfiguration } from '@vanguard/prisma';

import { Injectable } from '@nestjs/common';
import type {
	APIGuild as DiscordGuild,
	APIUser as DiscordUser,
	RESTAPIPartialCurrentUserGuild as DiscordUserGuild,
} from 'discord-api-types/v10';

@Injectable()
export class ParserService {
	public parseDiscordGuild({ banner, icon, id, name, owner_id }: DiscordGuild): APIGuild {
		return {
			banner,
			icon,
			id,
			name,
			owner_id,
		};
	}

	public parseDiscordUser({ avatar, global_name, id, username }: DiscordUser): APIUser {
		return {
			avatar,
			global_name,
			id,
			username,
		};
	}

	public parseDiscordUserGuild({ banner, icon, id, name, permissions }: DiscordUserGuild): APIUserGuild {
		return {
			banner,
			icon,
			id,
			name,
			permissions,
		};
	}

	public parseDiscordUserGuilds(discordUserGuilds: DiscordUserGuild[]): APIUserGuild[] {
		return discordUserGuilds.map(this.parseDiscordUserGuild);
	}

	public parseGuildTicketPanel({ channelId, channelParentId, enabled, panelId, title, type }: GuildTicketPanel): APIGuildTicketPanel {
		return {
			channelId,
			channelParentId,
			enabled,
			panelId,
			title,
			type,
		};
	}

	public parseGuildTicketPanels(guildTicketPanels: GuildTicketPanel[]): APIGuildTicketPanel[] {
		return guildTicketPanels.map(this.parseGuildTicketPanel);
	}

	public parseGuildTicketsConfiguration({
		enabled,
		panels,
	}: GuildTicketsConfiguration & {
		panels: GuildTicketPanel[];
	}): APIGuildTicketsConfiguration {
		return {
			enabled,
			panels: this.parseGuildTicketPanels(panels),
		};
	}
}
