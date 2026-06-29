import type { APIGuild, APIUser, APIUserGuild } from '@vanguard/api-contracts/interfaces';

import { Injectable } from '@nestjs/common';
import type {
	APIGuild as APIDiscordGuild,
	APIUser as APIDiscordUser,
	RESTAPIPartialCurrentUserGuild as APIDiscordUserGuild,
} from 'discord-api-types/v10';

@Injectable()
export class ParserService {
	public parseDiscordGuild({ banner, icon, id, name, owner_id }: APIDiscordGuild): APIGuild {
		return {
			banner,
			icon,
			id,
			name,
			owner_id,
		};
	}

	public parseDiscordUser({ avatar, global_name, id, username }: APIDiscordUser): APIUser {
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
	}: APIDiscordUserGuild): APIUserGuild {
		return {
			banner,
			icon,
			id,
			name,
			permissions,
		};
	}

	public parseDiscordUserGuilds(discordUserGuilds: APIDiscordUserGuild[]): APIUserGuild[] {
		return discordUserGuilds.map(this.parseDiscordUserGuild);
	}
}
