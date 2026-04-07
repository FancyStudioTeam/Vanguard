import { BitwisePermissionFlags } from '@discordeno/types';
import { rest } from '#lib/REST.ts';
import type { UserGuild } from '#types/Discord.ts';
import { hasPermission } from './hasPermission.ts';

export async function getCurrentUserGuilds(
	accessToken: string,
): Promise<UserGuild[]> {
	const userGuilds = (await rest.getGuilds(accessToken)) as UserGuild[];
	const userGuildsWithPermissions = filterGuildsWithPermissions(userGuilds);

	return userGuildsWithPermissions;
}

function filterGuildsWithPermissions(userGuilds: UserGuild[]): UserGuild[] {
	return userGuilds.filter(({ permissions }) =>
		hasPermission(permissions, BitwisePermissionFlags.MANAGE_GUILD),
	);
}
