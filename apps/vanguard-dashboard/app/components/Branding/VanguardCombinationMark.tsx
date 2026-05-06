import type { ComponentProps } from 'react';
import { Link } from 'react-router';

import { classNames } from '#utils/Tailwind/classNames.ts';
import { VanguardLogo } from './VanguardLogo.tsx';
import { VanguardSymbol } from './VanguardSymbol.tsx';

export function VanguardCombinationMark({ className, ...props }: VanguardCombinationMarksProps) {
	return (
		<Link
			aria-label='Vanguard Home'
			className={classNames('flex select-none items-center gap-2 transition-opacity hover:opacity-75', className)}
			to='/'
			viewTransition={true}
			{...props}
		>
			<VanguardSymbol />
			<VanguardLogo />
		</Link>
	);
}

export type VanguardCombinationMarksProps = Omit<ComponentProps<typeof Link>, 'to'>;
