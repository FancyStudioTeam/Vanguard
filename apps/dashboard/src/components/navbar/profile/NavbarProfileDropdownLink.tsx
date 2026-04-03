import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import type { HTMLAttributeAnchorTarget } from 'react';
import { DropdownMenuItem } from '#/components/ui/Dropdown.tsx';

export function NavbarProfileDropdownLink({
	href,
	icon: Icon,
	target,
	text,
}: NavbarProfileDropdownLinkProps) {
	return (
		<DropdownMenuItem
			asChild={true}
			className='justify-between'
		>
			<Link
				href={href}
				target={target}
			>
				<span className='truncate'>{text}</span>
				<Icon
					className='srink-0 size-5 text-neutral-400'
					weight='duotone'
				/>
			</Link>
		</DropdownMenuItem>
	);
}

export interface NavbarProfileDropdownLinkProps {
	href: string;
	icon: PhosphorIcon;
	target?: HTMLAttributeAnchorTarget;
	text: string;
}
