import type {
	Camelize,
	DiscordAccessTokenResponse,
	DiscordGuild,
	DiscordUser,
} from '@discordeno/types';

export type AccessTokenResponse = Camelize<DiscordAccessTokenResponse>;

export type Guild = Camelize<DiscordGuild>;

export type User = Camelize<DiscordUser>;
export type UserGuild = Pick<
	Camelize<DiscordGuild>,
	| 'approximateMemberCount'
	| 'approximatePresenceCount'
	| 'banner'
	| 'features'
	| 'icon'
	| 'id'
	| 'name'
> & {
	owner: boolean;
	permissions: string;
};
