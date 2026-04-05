import { CLIENT_ID, CLIENT_SECRET } from '#lib/Constants/Client.ts';
import { rest } from '#lib/REST.ts';
import type { UserCredentials } from '#types/Discord.ts';
import { createRedirectUrl } from '#utils/URL/createRedirectUrl.ts';

export async function exchangeAccessCode(
	code: string,
): Promise<UserCredentials> {
	return await rest.exchangeToken(CLIENT_ID, CLIENT_SECRET, {
		code,
		grantType: 'authorization_code',
		redirectUri: createRedirectUrl(),
	});
}
