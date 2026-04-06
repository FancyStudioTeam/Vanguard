import { Separator as RadixSeparator } from 'radix-ui';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function Separator({
	className,
	orientation = 'horizontal',
	...props
}: SeparatorProps) {
	return (
		<RadixSeparator.Root
			className={twMerge(
				'shrink-0 bg-neutral-800 data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-0.5',
				className,
			)}
			orientation={orientation}
			{...props}
		/>
	);
}

export type SeparatorProps = ComponentProps<typeof RadixSeparator.Root>;
