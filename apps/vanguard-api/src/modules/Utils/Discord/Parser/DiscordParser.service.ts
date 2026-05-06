import {
	PermissionFlagsBits,
	type RESTAPIPartialCurrentUserGuild,
	type RESTGetAPICurrentUserGuildsResult,
	type RESTGetAPIGuildResult,
	type RESTGetAPIUserResult,
	type RESTPostOAuth2AccessTokenResult,
} from '@discordjs/core';
import { Injectable } from '@nestjs/common';

import type { Guild, User, UserAccessResult, UserGuild } from '#lib/Types/Discord.js';
import { hasPermission } from '#utils/Discord/hasPermission.js';

@Injectable()
export class DiscordParserService {
	public parseGuild(response: RESTGetAPIGuildResult): Guild {
		const { banner, icon, id, name, owner_id } = response;

		return {
			banner,
			icon,
			id,
			name,
			ownerId: owner_id,
		};
	}

	public parseUser(response: RESTGetAPIUserResult): User {
		const { avatar, global_name, id, username } = response;

		return {
			avatar,
			globalName: global_name,
			id,
			username,
		};
	}

	public parseUserAccessResult(response: RESTPostOAuth2AccessTokenResult): UserAccessResult {
		const { access_token, refresh_token } = response;

		return {
			accessToken: access_token,
			refreshToken: refresh_token,
		};
	}

	public parseUserGuild(response: RESTAPIPartialCurrentUserGuild): UserGuild {
		const { banner, icon, id, name, permissions } = response;

		return {
			banner,
			icon,
			id,
			name,
			permissions,
		};
	}

	public parseUserGuilds(response: RESTGetAPICurrentUserGuildsResult): UserGuild[] {
		return response.filter(({ permissions }) => hasPermission(permissions, PermissionFlagsBits.ManageGuild)).map(this.parseUserGuild);
	}
}
