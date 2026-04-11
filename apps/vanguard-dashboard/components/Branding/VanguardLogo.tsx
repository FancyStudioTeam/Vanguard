import type { HTMLProps } from 'react';
import { classNames } from '#utils/Tailwind/classNames.ts';

export function VanguardLogo({ className, ...props }: VanguardLogoProps) {
	return (
		<span
			className={classNames('font-bold text-xl', className)}
			{...props}
		>
			Vanguard
		</span>
	);
}

export type VanguardLogoProps = HTMLProps<HTMLHeadingElement>;
