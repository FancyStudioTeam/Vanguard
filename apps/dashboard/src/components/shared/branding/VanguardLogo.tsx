import type { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function VanguardLogo({ className, ...props }: VanguardLogoProps) {
	return (
		<h1 className={twMerge('font-bold text-xl', className)} {...props}>
			Vanguard
		</h1>
	);
}

export type VanguardLogoProps = HTMLProps<HTMLHeadingElement>;
