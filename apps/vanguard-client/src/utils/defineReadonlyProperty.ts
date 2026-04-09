export function defineReadonlyProperty(
	object: object,
	name: string,
	value: unknown,
): void {
	Reflect.defineProperty(object, name, {
		configurable: false,
		enumerable: false,
		value,
		writable: false,
	});
}
