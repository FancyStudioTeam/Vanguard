import { unauthorized } from 'next/navigation';
import { BASE_API_URL } from '#lib/Constants/Shared.ts';
import { getAllCookiesString } from './getAllCookiesString.ts';

export async function verifySession(): Promise<AuthSessionUser> {
	const cookie = await getAllCookiesString();
	const response = await fetch(`${BASE_API_URL}/auth/session`, {
		headers: {
			cookie,
		},
	});

	const { ok } = response;

	if (!ok) {
		unauthorized();
	}

	return await response.json();
}

export interface AuthSessionUser {
	avatar: string | null;
	globalName: string | null;
	id: string;
	username: string;
}
