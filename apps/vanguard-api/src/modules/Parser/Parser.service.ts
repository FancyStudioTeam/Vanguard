import type { APIGuild, APIUser, APIUserGuild } from '@vanguard/api-types/interfaces';

import { Injectable } from '@nestjs/common';
import type {
	APIGuild as DiscordGuild,
	APIUser as DiscordUser,
	RESTAPIPartialCurrentUserGuild as DiscordUserGuild,
} from 'discord-api-types/v10';

@Injectable()
export class ParserService {
	/**
	 * @see https://docs.discord.com/developers/resources/guild#guild-object-guild-structure
	 */
	public parseDiscordGuild({ banner, icon, id, name, owner_id }: DiscordGuild): APIGuild {
		return {
			banner,
			icon,
			id,
			name,
			owner_id,
		};
	}

	/**
	 * @see https://docs.discord.com/developers/resources/user#user-object-user-structure
	 */
	public parseDiscordUser({ avatar, global_name, id, username }: DiscordUser): APIUser {
		return {
			avatar,
			global_name,
			id,
			username,
		};
	}

	/**
	 * @see https://docs.discord.com/developers/resources/user#get-current-user-guilds-example-partial-guild
	 */
	public parseDiscordUserGuild({ banner, icon, id, name, permissions }: DiscordUserGuild): APIUserGuild {
		return {
			banner,
			icon,
			id,
			name,
			permissions,
		};
	}

	/**
	 * @see https://docs.discord.com/developers/resources/user#get-current-user-guilds-example-partial-guild
	 */
	public parseDiscordUserGuilds(discordUserGuilds: DiscordUserGuild[]): APIUserGuild[] {
		return discordUserGuilds.map(this.parseDiscordUserGuild);
	}
}
