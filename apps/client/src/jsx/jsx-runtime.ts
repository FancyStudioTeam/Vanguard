export function Fragment({ children }: FragmentProps): unknown {
	return Array.isArray(children)
		? children.flat()
		: [
				children,
			];
}

export const jsx = (
	// biome-ignore lint/complexity/noBannedTypes: (x)
	type: Function,
	props: Record<string, unknown>,
	...children: unknown[]
): unknown => {
	return type({
		...props,
		children: props.children ?? children,
	});
};

export const jsxs = jsx;

export interface FragmentProps {
	children: unknown[];
}
