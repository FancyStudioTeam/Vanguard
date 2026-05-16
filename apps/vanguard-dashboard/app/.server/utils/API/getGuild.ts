import type { RESTGetAPIGuild } from '@vanguard/api-types/rest';

import { redirect } from 'react-router';

import { HttpStatus } from '#server/lib/Constants/HttpStatus.ts';
import { BASE_API_URL } from '#server/lib/Constants/Shared.ts';
import { getCookieHeader } from '../Request/getCookieHeader.ts';

export async function getGuild(request: Request, guildId: string): Promise<RESTGetAPIGuild> {
	const response = await createRequest(request, guildId);
	const responseBody = await response.json();

	const { ok, status } = response;

	if (ok) {
		return responseBody;
	}

	if (status === HttpStatus.NotFound) {
		throw redirect(`${BASE_API_URL}/api/guilds/${guildId}/invite`);
	}

	const { code, message } = responseBody;

	throw redirect(`/?message=${code ?? message}`);
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
