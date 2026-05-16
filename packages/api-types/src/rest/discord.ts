// biome-ignore-all lint/style/useNamingConvention: (x)

import type { APIGuild, APIUser, APIUserGuild } from '#interfaces/discord.js';

export type RESTGetAPIGuildResponse = APIGuild;

export type RESTGetAPIUserGuildsResponse = APIUserGuild[];
export type RESTGetAPIUserResponse = APIUser;
