import { OAuth2Scope } from '@discordeno/types';
import { createOAuth2Link } from '@discordeno/utils';
import { CLIENT_ID } from '#lib/Constants/Client.ts';

export function createGuildInviteUrl(guildId: string): string {
	return createOAuth2Link({
		clientId: CLIENT_ID,
		disableGuildSelect: true,
		guildId,
		permissions: [
			'EMBED_LINKS',
			'MANAGE_GUILD',
			'MANAGE_THREADS',
			'MODERATE_MEMBERS',
			'READ_MESSAGE_HISTORY',
			'SEND_MESSAGES',
			'SEND_MESSAGES_IN_THREADS',
			'USE_EXTERNAL_EMOJIS',
			'VIEW_CHANNEL',
		],
		scope: [
			OAuth2Scope.Bot,
		],
	});
}
