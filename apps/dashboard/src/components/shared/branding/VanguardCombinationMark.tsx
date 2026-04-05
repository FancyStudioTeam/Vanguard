import Link from 'next/link';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { VanguardLogo } from './VanguardLogo.tsx';
import { VanguardSymbol } from './VanguardSymbol.tsx';

export function VanguardCombinationMark({
	className,
	...props
}: VanguardCombinationMarksProps) {
	return (
		<Link
			{...props}
			aria-label='Vanguard Home'
			className={twMerge(
				'inline-flex select-none items-center gap-2 transition-opacity hover:opacity-75',
				className,
			)}
			href='/'
		>
			<VanguardSymbol />
			<VanguardLogo />
		</Link>
	);
}

export type VanguardCombinationMarksProps = Omit<
	ComponentProps<typeof Link>,
	'href'
>;
