import { ButtonVariants } from '@vanguard/ui/Button.js';

import type { ComponentType } from 'react';
import { useLocation } from 'react-router';

export function SidebarGroupItem({ disabled, href, icon: Icon, name }: SidebarGroupItemProps) {
	const { pathname } = useLocation();
	const isSelected = pathname === href;

	return (
		<a
			className={ButtonVariants({
				className: `justify-start ${disabled && 'pointer-events-none opacity-75'}`,
				variant: isSelected ? 'primary' : 'ghost',
			})}
			href={href}
		>
			<Icon />
			<span className='truncate'>{name}</span>
		</a>
	);
}

export interface SidebarGroupItemProps {
	disabled?: boolean;
	href: string;
	icon: ComponentType;
	name: string;
}
