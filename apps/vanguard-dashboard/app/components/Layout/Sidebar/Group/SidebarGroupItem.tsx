import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { useLocation } from 'react-router';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function SidebarGroupItem({ href, icon: Icon, name }: SidebarGroupItemProps) {
	const { pathname } = useLocation();
	const isSelected = pathname === href;

	return (
		<a
			className={classNames(
				'flex items-center gap-2 rounded-md p-2 text-sm transition-colors',
				isSelected ? 'bg-neutral-800 hover:bg-neutral-800/75' : 'hover:bg-neutral-800',
			)}
			href={href}
		>
			<Icon
				className='size-5 shrink-0 text-neutral-400'
				weight='fill'
			/>
			<span className='truncate'>{name}</span>
		</a>
	);
}

export interface SidebarGroupItemProps {
	details?: string;
	href: string;
	icon: PhosphorIcon;
	name: string;
}
