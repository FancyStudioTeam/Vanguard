import { cookies as NextCookies } from 'next/headers';

export async function getAllCookiesString(): Promise<string> {
	const nextCookies = await NextCookies();

	return nextCookies
		.getAll()
		.map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
		.join('; ');
}
