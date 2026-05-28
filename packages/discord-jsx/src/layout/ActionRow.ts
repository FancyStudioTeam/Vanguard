import {
	type ActionRow as ActionRowComponentInterface,
	MessageComponentTypes,
} from '@discordeno/bot';

import { flattenChildren } from '#utils/flattenChildren.js';

export function ActionRow({ children }: ActionRowProps): ActionRowComponentInterface {
	const components = flattenChildren(children);

	return {
		components,
		type: MessageComponentTypes.ActionRow,
	};
}

export interface ActionRowProps {
	children: ActionRowChildComponent | ActionRowChildComponent[];
}

type ActionRowChildComponent = ActionRowComponentInterface['components'][number];
