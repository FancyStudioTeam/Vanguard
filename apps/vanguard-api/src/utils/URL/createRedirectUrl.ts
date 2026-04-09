import { OAuth2Scope } from '@discordeno/types';
import { createOAuth2Link } from '@discordeno/utils';
import { CLIENT_ID } from '#lib/Constants/Client.js';
import { createCallbackUrl } from './createCallbackUrl.js';

export function createRedirectUrl(): string {
	const callbackUrl = createCallbackUrl();
	const redirectUrl = createOAuth2Link({
		clientId: CLIENT_ID,
		prompt: 'none',
		redirectUri: callbackUrl,
		responseType: 'code',
		scope: [
			OAuth2Scope.Email,
			OAuth2Scope.Identify,
			OAuth2Scope.Guilds,
			OAuth2Scope.GuildsMembersRead,
		],
	});

	return redirectUrl;
}
