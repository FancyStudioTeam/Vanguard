import type { HtmlHTMLAttributes } from 'react';

import { classNames } from '#utils/Tailwind/classNames.ts';
import { VanguardLogo } from './VanguardLogo.tsx';
import { VanguardSymbol } from './VanguardSymbol.tsx';

export function VanguardCombinationMark({ className, ...props }: VanguardCombinationMarksProps) {
	return (
		<a
			aria-label='Vanguard Home'
			className={classNames('flex select-none items-center gap-2 transition-opacity hover:opacity-75', className)}
			href='/'
			{...props}
		>
			<VanguardSymbol />
			<VanguardLogo />
		</a>
	);
}

export type VanguardCombinationMarksProps = HtmlHTMLAttributes<HTMLAnchorElement>;
