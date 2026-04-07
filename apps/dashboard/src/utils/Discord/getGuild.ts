import type { Camelize, DiscordGuild } from '@discordeno/types';
import { rest } from '#lib/REST.ts';

export async function getGuild(
	guildId: string,
): Promise<Camelize<DiscordGuild>> {
	return await rest.getGuild(guildId);
}
