import type {
	ChatInputCommandHandlerConstructor,
	ChatInputCommandHandlerDeclareOptions,
} from '#handlers/commands/structures/ChatInputCommandHandler.js';
import type {
	UserContextCommandHandlerConstructor,
	UserContextCommandHandlerDeclareOptions,
} from '#handlers/commands/structures/UserContextCommandHandler.js';

export type DeclareOptions<Target extends DeclarableConstructor> =
	Target extends ChatInputCommandHandlerConstructor
		? ChatInputCommandHandlerDeclareOptions
		: Target extends UserContextCommandHandlerConstructor
			? UserContextCommandHandlerDeclareOptions
			: never;

export type DeclarableConstructor = DeclarableCommandConstructor;

export type DeclarableCommandConstructor =
	| ChatInputCommandHandlerConstructor
	| UserContextCommandHandlerConstructor;
