import { ButtonVariants } from '@vanguard/ui/Button.js';

import type { ComponentType } from 'react';
import { Link, useLocation } from 'react-router';

export function SidebarGroupItem({ disabled, href, icon: Icon, name }: SidebarGroupItemProps) {
	const { pathname } = useLocation();

	const isSelected = pathname === href;

	return (
		<Link
			className={ButtonVariants({
				className: [
					'justify-start',
					disabled && 'pointer-events-none opacity-75',
				],
				variant: isSelected ? 'primary' : 'ghost',
			})}
			to={href}
		>
			<Icon />
			<span className='truncate'>{name}</span>
		</Link>
	);
}

export interface SidebarGroupItemProps {
	disabled?: boolean;
	href: string;
	icon: ComponentType;
	name: string;
}
