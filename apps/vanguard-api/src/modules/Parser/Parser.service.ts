import type {
	DiscordGuild,
	DiscordUser,
	DiscordUserGuild,
} from '@vanguard/api-contracts/interfaces';

import { Injectable } from '@nestjs/common';
import type { APIGuild, APIUser, RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';

@Injectable()
export class ParserService {
	public parseDiscordGuild({ banner, icon, id, name, owner_id }: APIGuild): DiscordGuild {
		return {
			banner,
			icon,
			id,
			name,
			ownerId: owner_id,
		};
	}

	public parseDiscordUser({ avatar, global_name, id, username }: APIUser): DiscordUser {
		return {
			avatar,
			globalName: global_name,
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
}
