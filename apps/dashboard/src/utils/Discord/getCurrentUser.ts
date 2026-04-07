import { rest } from '#lib/REST.ts';
import type { User } from '#types/Discord.ts';

export async function getCurrentUser(accessToken: string): Promise<User> {
	return await rest.getCurrentUser(accessToken);
}
