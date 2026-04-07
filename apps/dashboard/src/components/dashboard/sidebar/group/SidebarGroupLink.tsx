'use client';

import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '#components/ui/Button.tsx';

export function SidebarGroupLink({
	href,
	icon: Icon,
	text,
}: SidebarGroupLinkProps) {
	const pathname = usePathname();
	const variant = pathname === href ? 'secondary' : 'ghost';

	return (
		<Button
			asChild={true}
			className='justify-start'
			variant={variant}
		>
			<Link href={href}>
				<Icon
					className='size-5 shrink-0'
					weight='fill'
				/>
				<span className='truncate'>{text}</span>
			</Link>
		</Button>
	);
}

export interface SidebarGroupLinkProps {
	href: string;
	icon: PhosphorIcon;
	text: string;
}
