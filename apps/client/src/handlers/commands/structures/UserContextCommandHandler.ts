import { ApplicationCommandTypes, type CreateApplicationCommand } from '@discordeno/bot';
import { HandlerBase } from '#handlers/base/HandlerBase.js';
import type { User } from '#lib/InferredTypes.js';
import type { Constructor } from '#lib/Types.js';

export abstract class UserContextCommandHandler extends HandlerBase {
	public declare readonly declare: UserContextCommandHandlerDeclareOptions;

	public abstract run(): unknown;

	public getTargetUser(): User {
		const { data } = this.getInteraction();

		if (!data) {
			throw new TypeError('Cannot get target user without data');
		}

		const { resolved, targetId } = data;
		const { users } = resolved ?? {};

		if (!targetId) {
			throw new TypeError('Cannot get target user without target ID');
		}

		const targetUser = users?.get(targetId);

		if (!targetUser) {
			throw new TypeError('Target user is always present on user context commands');
		}

		return targetUser;
	}

	public toOptions(): CreateApplicationCommand {
		const { declare } = this;

		return {
			...declare,
			type: ApplicationCommandTypes.User,
		};
	}
}

export type UserContextCommandHandlerConstructor = Constructor<UserContextCommandHandler>;
export type UserContextCommandHandlerDeclareOptions = Pick<
	CreateApplicationCommand,
	| 'contexts'
	| 'defaultMemberPermissions'
	| 'integrationTypes'
	| 'name'
	| 'nameLocalizations'
	| 'nsfw'
>;
