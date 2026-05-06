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

@Injectable()
export class DiscordUtilsService {
	/**
	 * @see https://docs.discord.com/developers/topics/permissions#permission-overwrites
	 */
	public hasPermission(userPermissions: string, permission: bigint): boolean {
		return (BigInt(userPermissions) & permission) === permission;
	}

	/**
	 * @see https://docs.discord.com/developers/resources/guild#guild-object
	 */
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

	/**
	 * @see https://docs.discord.com/developers/resources/user#user-object
	 */
	public parseUser(response: RESTGetAPIUserResult): User {
		const { avatar, global_name, id, username } = response;

		return {
			avatar,
			globalName: global_name,
			id,
			username,
		};
	}

	/**
	 * @see https://docs.discord.com/developers/topics/oauth2#authorization-code-grant-access-token-response
	 */
	public parseUserAccessResult(response: RESTPostOAuth2AccessTokenResult): UserAccessResult {
		const { access_token, refresh_token } = response;

		return {
			accessToken: access_token,
			refreshToken: refresh_token,
		};
	}

	/**
	 * @see https://docs.discord.com/developers/resources/user#get-current-user-guilds-example-partial-guild
	 */
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

	/**
	 * @see https://docs.discord.com/developers/resources/user#get-current-user-guilds-example-partial-guild
	 */
	public parseUserGuilds(response: RESTGetAPICurrentUserGuildsResult): UserGuild[] {
		return response
			.filter(({ permissions }) => this.hasPermission(permissions, PermissionFlagsBits.ManageGuild))
			.map(this.parseUserGuild);
	}
}
