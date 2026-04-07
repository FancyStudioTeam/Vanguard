import { rest } from '#lib/REST.ts';
import type { Guild } from '#types/Discord.ts';

export async function getGuild(guildId: string): Promise<Guild> {
	return await rest.getGuild(guildId);
}
