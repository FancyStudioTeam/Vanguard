import type { User } from '@vanguard/discord-config/inferred-types';

import { ApplicationCommandTypes, type CreateApplicationCommand } from '@discordeno/bot';
import type { Class } from 'utility-types';

import { HandlerBase } from '#base/HandlerBase.js';
import { CANNOT_RETREIVE_TARGET, CANNOT_RETREIVE_TARGET_WITHOUT_TARGET_ID } from '#messages/Errors.js';

export abstract class UserContextHandler extends HandlerBase {
	public declare readonly declare: UserContextHandlerDeclareOptions;

	public abstract run(): unknown;

	public getTargetUser(): User {
		const { data } = this.getInteraction();
		const { resolved, targetId } = data ?? {};

		if (!targetId) {
			throw new TypeError(CANNOT_RETREIVE_TARGET_WITHOUT_TARGET_ID);
		}

		const resolvedUsers = resolved?.users;
		const resolvedUser = resolvedUsers?.get(targetId);

		if (!resolvedUser) {
			throw new TypeError(CANNOT_RETREIVE_TARGET);
		}

		return resolvedUser;
	}

	public getApplicationCommandOptions(): CreateApplicationCommand {
		return {
			...this.declare,
			type: ApplicationCommandTypes.User,
		};
	}

	public getApplicationCommandType(): ApplicationCommandTypes.User {
		return ApplicationCommandTypes.User;
	}
}

export type UserContextHandlerConstructor = Class<UserContextHandler>;
export type UserContextHandlerDeclareOptions = Pick<
	CreateApplicationCommand,
	'contexts' | 'defaultMemberPermissions' | 'integrationTypes' | 'name' | 'nameLocalizations' | 'nsfw'
>;
