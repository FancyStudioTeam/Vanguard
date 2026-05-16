// biome-ignore-all lint/style/useNamingConvention: (x)

import type { APIUser } from '@vanguard/api-types/interfaces';

import { Injectable } from '@nestjs/common';
import type { APIUser as DiscordAPIUser } from 'discord-api-types/v10';

@Injectable()
export class UserService {
	public parseUserForResponse({ avatar, global_name, id, username }: DiscordAPIUser): APIUser {
		return {
			avatar,
			global_name,
			id,
			username,
		};
	}
}
