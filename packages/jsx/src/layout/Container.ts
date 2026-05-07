import { type ContainerComponent as ContainerComponentInterface, MessageComponentTypes } from '@discordeno/bot';

import { flattenChildren } from '#utils/flattenChildren.js';

export function Container({ accentColor, children, spoiler }: ContainerProps): ContainerComponentInterface {
	const components = flattenChildren(children);

	return {
		accentColor,
		components,
		spoiler,
		type: MessageComponentTypes.Container,
	};
}

export interface ContainerProps extends Pick<ContainerComponentInterface, 'accentColor' | 'spoiler'> {
	children: ContainerChildComponent | ContainerChildComponent[];
}

type ContainerChildComponent = ContainerComponentInterface['components'][number];
