import type {
	ChatInputCommandHandlerConstructor,
	ChatInputCommandHandlerDeclareOptions,
} from '#handlers/commands/structures/ChatInputCommandHandler.js';

export type DeclareOptions<Target extends DeclarableConstructor> =
	Target extends ChatInputCommandHandlerConstructor
		? ChatInputCommandHandlerDeclareOptions
		: never;

export type DeclarableConstructor = DeclarableCommandConstructor;

export type DeclarableCommandConstructor = ChatInputCommandHandlerConstructor;
