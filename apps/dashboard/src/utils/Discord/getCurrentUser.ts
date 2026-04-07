import type { Camelize, DiscordUser } from '@discordeno/types';
import { rest } from '#lib/REST.ts';

export async function getCurrentUser(
	accessToken: string,
): Promise<Camelize<DiscordUser>> {
	return await rest.getCurrentUser(accessToken);
}
