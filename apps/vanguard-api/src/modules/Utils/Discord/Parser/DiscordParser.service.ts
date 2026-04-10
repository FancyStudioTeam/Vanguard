import type {
	RESTAPIPartialCurrentUserGuild,
	RESTGetAPICurrentUserGuildsResult,
	RESTGetAPIUserResult,
	RESTPostOAuth2AccessTokenResult,
} from '@discordjs/core';
import { Injectable } from '@nestjs/common';
import type { User, UserAccessResult, UserGuild } from '#types/Discord.js';

@Injectable()
export class DiscordParserService {
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
		return response.map(this.parseUserGuild);
	}
}
