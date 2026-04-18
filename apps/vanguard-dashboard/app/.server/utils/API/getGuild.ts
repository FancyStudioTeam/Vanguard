import { redirect } from 'react-router';
import { match } from 'ts-pattern';
import { BASE_API_URL } from '#server/lib/Constants/Shared.ts';
import type { Guild } from '#server/lib/Types/API.ts';
import { getCookieHeader } from '../Request/getCookieHeader.ts';

export async function getGuild(request: Request, guildId: string): Promise<Guild> {
	return await match(await createRequest(request, guildId))
		.returnType<Promise<Guild>>()
		.with(
			{
				ok: true,
			},
			async (response) => await response.json(),
		)
		.with(
			{
				status: 404,
			},
			() => {
				throw redirect(`${BASE_API_URL}/api/guilds/${guildId}/invite`);
			},
		)
		.otherwise(() => {
			throw redirect('/');
		});
}

async function createRequest(request: Request, guildId: string): Promise<Response> {
	const cookie = getCookieHeader(request);
	const response = await fetch(`${BASE_API_URL}/api/guilds/${guildId}`, {
		headers: {
			cookie,
		},
	});

	return response;
}
