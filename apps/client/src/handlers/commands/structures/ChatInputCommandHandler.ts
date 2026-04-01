import { ApplicationCommandTypes, type CreateApplicationCommand } from '@discordeno/bot';
import { HandlerBase } from '#handlers/base/HandlerBase.js';
import type { Constructor } from '#lib/Types.js';

export abstract class ChatInputCommandHandler extends HandlerBase {
	declare readonly declare: ChatInputCommandHandlerDeclareOptions;

	abstract run(): unknown;

	toOptions(): CreateApplicationCommand {
		const { declare } = this;

		return {
			...declare,
			type: ApplicationCommandTypes.ChatInput,
		};
	}
}

export type ChatInputCommandHandlerConstructor = Constructor<ChatInputCommandHandler>;
export type ChatInputCommandHandlerDeclareOptions = Pick<
	CreateApplicationCommand,
	| 'contexts'
	| 'defaultMemberPermissions'
	| 'description'
	| 'descriptionLocalizations'
	| 'integrationTypes'
	| 'name'
	| 'nameLocalizations'
	| 'nsfw'
	| 'options'
>;
