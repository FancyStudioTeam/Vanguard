import { MessageComponentTypes, type SeparatorComponent as SeparatorComponentInterface } from '@discordeno/bot';

export function Separator({ divider, spacing }: SeparatorProps): SeparatorComponentInterface {
	return {
		divider,
		spacing,
		type: MessageComponentTypes.Separator,
	};
}

export type SeparatorProps = Pick<SeparatorComponentInterface, 'divider' | 'spacing'>;
