import {
	BitwisePermissionFlags,
	type Camelize,
	type DiscordGuild,
} from '@discordeno/types';
import { rest } from '#lib/REST.ts';
import type { UserGuild } from '#types/Discord.ts';
import { hasPermission } from './hasPermission.ts';

export async function getCurrentUserGuilds(
	accessToken: string,
): Promise<UserGuild[]> {
	const response = await rest.getGuilds(accessToken);

	// @ts-expect-error
	const userGuilds = parseUserGuilds(response);
	const userGuildsWithPermissions = filterGuildsWithPermissions(userGuilds);

	return userGuildsWithPermissions;
}

function filterGuildsWithPermissions(userGuilds: UserGuild[]): UserGuild[] {
	return userGuilds.filter(({ permissions }) =>
		hasPermission(permissions, BitwisePermissionFlags.MANAGE_GUILD),
	);
}

function parseUserGuild({
	banner,
	icon,
	id,
	name,
	owner,
	permissions,
}: Camelize<DiscordGuild>): UserGuild {
	return {
		banner,
		icon,
		id,
		name,
		owner: Boolean(owner),
		permissions: String(permissions),
	};
}

function parseUserGuilds(rawUserGuilds: Camelize<DiscordGuild>[]): UserGuild[] {
	return rawUserGuilds.map(parseUserGuild);
}
