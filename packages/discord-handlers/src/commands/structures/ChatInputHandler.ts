import { ApplicationCommandTypes, type CreateApplicationCommand } from '@discordeno/bot';
import type { Class, Required } from 'utility-types';

import { HandlerBase } from '#base/HandlerBase.js';

export abstract class ChatInputHandler extends HandlerBase {
	public declare readonly declare: ChatInputHandlerDeclareOptions;

	public abstract run(): unknown;

	public getApplicationCommandOptions(): CreateApplicationCommand {
		return {
			...this.declare,
			type: ApplicationCommandTypes.ChatInput,
		};
	}

	public getApplicationCommandType(): ApplicationCommandTypes.ChatInput {
		return ApplicationCommandTypes.ChatInput;
	}
}

export type ChatInputHandlerConstructor = Class<ChatInputHandler>;
export type ChatInputHandlerDeclareOptions = Required<
	Pick<
		CreateApplicationCommand,
		| 'contexts'
		| 'defaultMemberPermissions'
		| 'description'
		| 'descriptionLocalizations'
		| 'integrationTypes'
		| 'name'
		| 'nameLocalizations'
		| 'nsfw'
	>,
	'description'
>;
