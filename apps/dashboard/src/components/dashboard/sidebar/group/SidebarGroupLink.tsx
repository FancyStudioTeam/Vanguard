'use client';

import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function SidebarGroupLink({
	href,
	icon: Icon,
	text,
}: SidebarGroupLinkProps) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			className={twMerge(
				'flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-neutral-800/75 hover:text-neutral-50',
				isActive
					? 'bg-neutral-800 text-neutral-50'
					: 'text-neutral-400',
			)}
			href={href}
		>
			<Icon
				className='size-5 shrink-0'
				weight='fill'
			/>
			<span className='truncate'>{text}</span>
		</Link>
	);
}

export interface SidebarGroupLinkProps {
	href: string;
	icon: PhosphorIcon;
	text: string;
}
