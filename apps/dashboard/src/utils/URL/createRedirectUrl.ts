import { OAuth2Scope } from '@discordeno/types';
import { CLIENT_ID } from '#lib/Constants/Client.ts';
import { createCallbackUrl } from './createCallbackUrl.ts';

const SCOPES = [
	OAuth2Scope.Email,
	OAuth2Scope.Identify,
	OAuth2Scope.Guilds,
	OAuth2Scope.GuildsMembersRead,
];

export function createRedirectUrl(): string {
	const callbackUrl = createCallbackUrl();

	/*
	 * Discord scopes MUST be joined with '+'.
	 */
	const scopesString = SCOPES.join('+');

	const authorizationUrl = new URL(
		'https://discord.com/api/v10/oauth2/authorize',
	);
	const { searchParams } = authorizationUrl;

	/*
	 * This assignment MUST be made before setting other query string parameters,
	 * as this property overrides all search properties.
	 */
	authorizationUrl.search = `scope=${scopesString}`;

	searchParams.set('client_id', CLIENT_ID);
	searchParams.set('redirect_uri', callbackUrl);
	searchParams.set('response_type', 'code');

	searchParams.set('prompt', 'none');

	return authorizationUrl.toString();
}
