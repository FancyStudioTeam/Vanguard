import type {
	MessageContextHandlerConstructor,
	MessageContextHandlerDeclareOptions,
	UserContextHandlerConstructor,
	UserContextHandlerDeclareOptions,
} from '#commands/index.js';

export function Declare<Target extends DeclarableConstructor>(options: DeclareOptions<Target>) {
	return (target: Target) => {
		return class extends target {
			constructor(...args: unknown[]) {
				super(...args);

				Object.defineProperty(this, 'declare', {
					configurable: false,
					enumerable: false,
					value: options,
					writable: false,
				});
			}
		};
	};
}

export type DeclarableCommandConstructor = MessageContextHandlerConstructor | UserContextHandlerConstructor;

export type DeclarableConstructor = DeclarableCommandConstructor;

export type DeclareOptions<Target extends DeclarableConstructor> = Target extends MessageContextHandlerConstructor
	? MessageContextHandlerDeclareOptions
	: Target extends UserContextHandlerConstructor
		? UserContextHandlerDeclareOptions
		: never;
