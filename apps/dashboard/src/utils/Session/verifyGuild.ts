import {
	BitwisePermissionFlags,
	type Camelize,
	type DiscordGuild,
} from '@discordeno/types';
import { unstable_cache } from 'next/cache';
import { forbidden, redirect } from 'next/navigation';
import { rest } from '#lib/REST.ts';
import { getGuild } from '#utils/Discord/getGuild.ts';
import { hasPermission } from '#utils/Discord/hasPermission.ts';
import { createGuildInviteUrl } from '#utils/URL/createGuildInviteUrl.ts';

export async function verifyGuild(
	guildId: string,
	{ accessToken, userId }: VerifyGuildOptions,
): Promise<Camelize<DiscordGuild>> {
	const getCachedPermissions = unstable_cache(
		async (guildId: string, accessToken: string) =>
			await rest
				.getCurrentMember(guildId, accessToken)
				.then(({ permissions }) => permissions ?? '0')
				.catch(() => '0'),
		[
			'guild-permissions',
		],
		{
			revalidate: 60,
			tags: [
				`guild-permissions:${guildId}:${userId}`,
			],
		},
	);
	const permissions = await getCachedPermissions(guildId, accessToken);

	if (!hasPermission(permissions, BitwisePermissionFlags.MANAGE_GUILD)) {
		forbidden();
	}

	let guild: Camelize<DiscordGuild>;

	try {
		guild = await getGuild(guildId);
	} catch {
		redirect(createGuildInviteUrl(guildId));
	}

	return guild;
}

interface VerifyGuildOptions {
	accessToken: string;
	userId: string;
}
