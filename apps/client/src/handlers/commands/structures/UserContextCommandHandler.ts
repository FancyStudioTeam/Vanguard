import { ApplicationCommandTypes, type CreateApplicationCommand } from '@discordeno/bot';
import { HandlerBase } from '#handlers/base/HandlerBase.js';
import type { Constructor } from '#lib/Types.js';

export abstract class UserContextCommandHandler extends HandlerBase {
	public declare readonly declare: UserContextCommandHandlerDeclareOptions;

	public abstract run(): unknown;

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
