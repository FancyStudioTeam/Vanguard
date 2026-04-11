import { redirect } from 'react-router';
import { BASE_API_URL } from '#server/lib/Constants/Shared.ts';
import { getCookieHeader } from '../Request/getCookieHeader.ts';

export async function getSession(request: Request): Promise<User> {
	const response = await createRequest(request);
	const { ok } = response;

	if (!ok) {
		throw redirect(`${BASE_API_URL}/auth/sign-in`);
	}

	return await response.json();
}

async function createRequest(request: Request): Promise<Response> {
	const cookie = getCookieHeader(request);
	const response = await fetch(`${BASE_API_URL}/users/@me`, {
		headers: {
			cookie,
		},
	});

	return response;
}

export interface User {
	avatar: string | null;
	globalName: string | null;
	id: string;
	username: string;
}

export interface UserGuild {
	banner: string | null;
	icon: string | null;
	id: string;
	name: string;
	permissions: string;
}
