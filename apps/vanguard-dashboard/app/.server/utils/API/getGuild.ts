import { redirect } from 'react-router';

import { HttpStatus } from '#server/lib/Constants/HttpStatus.ts';
import { BASE_API_URL } from '#server/lib/Constants/Shared.ts';
import type { Guild } from '#server/lib/Types/API.ts';
import { getCookieHeader } from '../Request/getCookieHeader.ts';

export async function getGuild(request: Request, guildId: string): Promise<Guild> {
	const response = await createRequest(request, guildId);
	const responseBody = await response.json();

	const { ok, status } = response;

	if (ok) {
		return responseBody;
	}

	if (status === HttpStatus.NotFound) {
		throw redirect(`${BASE_API_URL}/api/guilds/${guildId}/invite`);
	}

	const { message } = responseBody;

	throw redirect(`/?message=${message}`);
}

async function createRequest(request: Request, guildId: string): Promise<Response> {
	const requestUrl = `${BASE_API_URL}/api/guilds/${guildId}`;
	const requestCookie = getCookieHeader(request);

	const response = await fetch(requestUrl, {
		headers: {
			cookie: requestCookie,
		},
	});

	return response;
}
