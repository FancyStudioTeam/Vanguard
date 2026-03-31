import type { RecursivePartial, TransformersDesiredProperties } from '@discordeno/bot';

export const DESIRED_MESSAGE_PROPERTIES: DesiredMessageProperties = {
	author: true,
	channelId: true,
	components: true,
	content: true,
	id: true,
};

export const DESIRED_USER_PROPERTIES: DesiredUserProperties = {
	id: true,
	toggles: true,
	username: true,
};

export type DesiredProperties = RecursivePartial<TransformersDesiredProperties>;

type DesiredMessageProperties = DesiredProperties['message'];
type DesiredUserProperties = DesiredProperties['user'];
