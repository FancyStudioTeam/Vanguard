import type { RecursivePartial, TransformersDesiredProperties } from '@discordeno/bot';

export const DESIRED_GUILD_PROPERTIES: DesiredGuildProperties = {
	icon: true,
	id: true,
	name: true,
	ownerId: true,
	toggles: true,
};

export const DESIRED_MESSAGE_PROPERTIES: DesiredMessageProperties = {
	author: true,
	channelId: true,
	components: true,
	content: true,
	id: true,
};

export const DESIRED_USER_PROPERTIES: DesiredUserProperties = {
	avatar: true,
	id: true,
	toggles: true,
	username: true,
};

export type DesiredProperties = RecursivePartial<TransformersDesiredProperties>;

type DesiredGuildProperties = DesiredProperties['guild'];
type DesiredMessageProperties = DesiredProperties['message'];
type DesiredUserProperties = DesiredProperties['user'];
