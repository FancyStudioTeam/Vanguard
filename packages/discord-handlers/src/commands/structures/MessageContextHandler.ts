import type { Message } from '@vanguard/discord-config/inferred-types';

import { ApplicationCommandTypes, type CreateApplicationCommand, type InteractionData } from '@discordeno/bot';

import { HandlerBase } from '#base/HandlerBase.js';
import type { Constructor } from '#commands/types/Constructor.js';
import {
	CANNOT_RETREIVE_TARGET,
	CANNOT_RETREIVE_TARGET_WITHOUT_TARGET_ID,
	INTERACTION_CANNOT_BE_PROCESSED_WITHOUT_DATA,
} from '#messages/Errors.js';

export abstract class MessageContextHandler extends HandlerBase {
	public declare readonly declare: MessageContextHandlerDeclareOptions;

	public abstract run(): unknown;

	public getTargetMessage(): Message {
		const { data } = this.getInteraction();

		if (!data) {
			throw new TypeError(INTERACTION_CANNOT_BE_PROCESSED_WITHOUT_DATA);
		}

		const { resolved, targetId } = data as InteractionData;

		if (!targetId) {
			throw new TypeError(CANNOT_RETREIVE_TARGET_WITHOUT_TARGET_ID);
		}

		const { messages } = resolved ?? {};
		const message = messages?.get(targetId);

		if (!message) {
			throw new TypeError(CANNOT_RETREIVE_TARGET);
		}

		return message;
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

export type MessageContextHandlerConstructor = Constructor<MessageContextHandler>;
export type MessageContextHandlerDeclareOptions = Pick<
	CreateApplicationCommand,
	'contexts' | 'defaultMemberPermissions' | 'integrationTypes' | 'name' | 'nameLocalizations' | 'nsfw'
>;
