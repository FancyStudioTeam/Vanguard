import type { DeclarableConstructor, DeclareOptions } from './DeclareTypes.js';

export function Declare<Target extends DeclarableConstructor>(options: DeclareOptions<Target>) {
	return (target: Target) => {
		// @ts-expect-error
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
