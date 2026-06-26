import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { useLocation } from 'react-router';

import { ButtonVariants } from '#components/UI/Button.tsx';

export function SidebarGroupItem({ href, icon: Icon, name }: SidebarGroupItemProps) {
	const { pathname } = useLocation();
	const isSelected = pathname === href;

	return (
		<a
			className={ButtonVariants({
				className: 'justify-start',
				variant: isSelected ? 'primary' : 'ghost',
			})}
			href={href}
		>
			<Icon weight='fill' />
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
