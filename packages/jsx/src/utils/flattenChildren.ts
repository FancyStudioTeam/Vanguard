export function flattenChildren<Type>(children: Type): Flatten<Type>[] {
	if (Array.isArray(children)) {
		return children.flat() as Flatten<Type>[];
	}

	return [
		children as Flatten<Type>,
	];
}

type Flatten<Type> = Type extends readonly (infer Item)[] ? Flatten<Item> : Type;
