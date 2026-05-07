import { MessageComponentTypes, type TextDisplayComponent as TextDisplayComponentInterface } from '@discordeno/bot';

export function TextDisplay({ children }: TextDisplayProps): TextDisplayComponentInterface {
	return {
		content: children,
		type: MessageComponentTypes.TextDisplay,
	};
}

export interface TextDisplayProps {
	children: string;
}
