import type { Message } from '@vanguard/discord-config/inferred-types';

import { ApplicationCommandTypes, type CreateApplicationCommand } from '@discordeno/bot';
import type { Class } from 'utility-types';

import { HandlerBase } from '#base/HandlerBase.js';
import {
	CANNOT_RETREIVE_TARGET,
	CANNOT_RETREIVE_TARGET_WITHOUT_TARGET_ID,
} from '#messages/Errors.js';

export abstract class MessageContextHandler extends HandlerBase {
	public declare readonly declare: MessageContextHandlerDeclareOptions;

	public abstract run(): unknown;

	public getTargetMessage(): Message {
		const { data } = this.getInteraction();
		const { resolved, targetId } = data ?? {};

		if (!targetId) {
			throw new TypeError(CANNOT_RETREIVE_TARGET_WITHOUT_TARGET_ID);
		}

		const resolvedMessages = resolved?.messages;
		const resolvedMessage = resolvedMessages?.get(targetId);

		if (!resolvedMessage) {
			throw new TypeError(CANNOT_RETREIVE_TARGET);
		}

		return resolvedMessage;
	}

	public getApplicationCommandOptions(): CreateApplicationCommand {
		return {
			...this.declare,
			type: ApplicationCommandTypes.Message,
		};
	}

	public getApplicationCommandType(): ApplicationCommandTypes.Message {
		return ApplicationCommandTypes.Message;
	}
}

export type MessageContextHandlerConstructor = Class<MessageContextHandler>;
export type MessageContextHandlerDeclareOptions = Pick<
	CreateApplicationCommand,
	| 'contexts'
	| 'defaultMemberPermissions'
	| 'integrationTypes'
	| 'name'
	| 'nameLocalizations'
	| 'nsfw'
>;
