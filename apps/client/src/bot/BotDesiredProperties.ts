import type { RecursivePartial, TransformersDesiredProperties } from '@discordeno/bot';

export const DESIRED_GUILD_PROPERTIES = {
	icon: true,
	id: true,
	name: true,
	ownerId: true,
	toggles: true,
} satisfies DesiredGuildProperties;

export const DESIRED_INTERACTION_PROPERTIES = {
	data: true,
	id: true,
	token: true,
} satisfies DesiredInteractionProperties;

export const DESIRED_MESSAGE_PROPERTIES = {
	author: true,
	channelId: true,
	components: true,
	content: true,
	id: true,
} satisfies DesiredMessageProperties;

export const DESIRED_USER_PROPERTIES = {
	avatar: true,
	discriminator: true,
	id: true,
	toggles: true,
	username: true,
} satisfies DesiredUserProperties;

export type DesiredProperties = RecursivePartial<TransformersDesiredProperties>;

type DesiredGuildProperties = DesiredProperties['guild'];
type DesiredInteractionProperties = DesiredProperties['interaction'];
type DesiredMessageProperties = DesiredProperties['message'];
type DesiredUserProperties = DesiredProperties['user'];
