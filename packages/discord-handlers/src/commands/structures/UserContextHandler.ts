import type { User } from '@vanguard/discord-config/inferred-types';

import { ApplicationCommandTypes, type CreateApplicationCommand } from '@discordeno/bot';

import { HandlerBase } from '#base/HandlerBase.js';
import type { Constructor } from '#commands/types/Constructor.js';
import {
	CANNOT_RETREIVE_TARGET,
	CANNOT_RETREIVE_TARGET_WITHOUT_TARGET_ID,
	INTERACTION_CANNOT_BE_PROCESSED_WITHOUT_DATA,
} from '#messages/Errors.js';

export abstract class UserContextHandler extends HandlerBase {
	public declare readonly declare: UserContextHandlerDeclareOptions;
	public declare readonly type = ApplicationCommandTypes.User;

	public abstract run(): unknown;

	public getTargetUser(): User {
		const { data } = this.getInteraction();

		if (!data) {
			throw new TypeError(INTERACTION_CANNOT_BE_PROCESSED_WITHOUT_DATA);
		}

		const { resolved, targetId } = data;

		if (!targetId) {
			throw new TypeError(CANNOT_RETREIVE_TARGET_WITHOUT_TARGET_ID);
		}

		const { users } = resolved ?? {};
		const user = users?.get(targetId);

		if (!user) {
			throw new TypeError(CANNOT_RETREIVE_TARGET);
		}

		return user;
	}

	public toOptions(): CreateApplicationCommand {
		return {
			...this.declare,
			type: ApplicationCommandTypes.User,
		};
	}
}

export type UserContextHandlerConstructor = Constructor<UserContextHandler>;
export type UserContextHandlerDeclareOptions = Pick<
	CreateApplicationCommand,
	'contexts' | 'defaultMemberPermissions' | 'integrationTypes' | 'name' | 'nameLocalizations' | 'nsfw'
>;
