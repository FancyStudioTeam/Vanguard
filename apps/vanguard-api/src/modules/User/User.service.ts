import type { APIUser } from '@vanguard/api-types/interfaces';

import { Injectable } from '@nestjs/common';
import type { APIUser as DiscordUser } from 'discord-api-types/v10';

@Injectable()
export class UserService {
	/**
	 * @see https://docs.discord.com/developers/resources/user#user-object
	 */
	public parseDiscordUser({ avatar, global_name, id, username }: DiscordUser): APIUser {
		return {
			avatar,
			global_name,
			id,
			username,
		};
	}
}
