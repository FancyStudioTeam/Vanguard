import { type ButtonComponent as ButtonComponentInterface, ButtonStyles, MessageComponentTypes } from '@discordeno/bot';

export function LinkButton({ disabled, emoji, label, url }: LinkButtonProps): ButtonComponentInterface {
	return {
		disabled,
		emoji,
		label,
		style: ButtonStyles.Link,
		type: MessageComponentTypes.Button,
		url,
	};
}

export type LinkButtonProps = Pick<ButtonComponentInterface, 'disabled' | 'emoji' | 'label' | 'url'>;
