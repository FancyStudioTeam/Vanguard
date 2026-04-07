import { CLIENT_ID, CLIENT_SECRET } from '#lib/Constants/Client.ts';
import { rest } from '#lib/REST.ts';
import type { AccessTokenResponse } from '#types/Discord.ts';
import { createCallbackUrl } from '#utils/URL/createCallbackUrl.ts';

export async function exchangeAccessCode(
	code: string,
): Promise<AccessTokenResponse> {
	return await rest.exchangeToken(CLIENT_ID, CLIENT_SECRET, {
		code,
		grantType: 'authorization_code',
		redirectUri: createCallbackUrl(),
	});
}
