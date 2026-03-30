import type { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function VanguardLogo({ className, ...props }: VanguardLogoProps) {
	return (
		<span className={twMerge('font-bold text-xl', className)} {...props}>
			Vanguard
		</span>
	);
}

export type VanguardLogoProps = HTMLProps<HTMLHeadingElement>;
