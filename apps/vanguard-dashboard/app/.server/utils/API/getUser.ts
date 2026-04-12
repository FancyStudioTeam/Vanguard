import { redirect } from 'react-router';
import { BASE_API_URL } from '#server/lib/Constants/Shared.ts';
import type { User } from '#server/lib/Types/API.ts';
import { getCookieHeader } from '../Request/getCookieHeader.ts';

export async function getUser(request: Request): Promise<User> {
	const response = await createRequest(request);
	const { ok } = response;

	if (!ok) {
		throw redirect(`${BASE_API_URL}/api/auth/sign-in`);
	}

	return await response.json();
}

async function createRequest(request: Request): Promise<Response> {
	const cookie = getCookieHeader(request);
	const response = await fetch(`${BASE_API_URL}/api/users/@me`, {
		headers: {
			cookie,
		},
	});

	return response;
}
