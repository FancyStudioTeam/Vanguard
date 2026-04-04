import { SignOutIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { DropdownMenuItem } from '#/components/ui/Dropdown.tsx';

export function NavbarProfileDropdownLogout() {
	return (
		<DropdownMenuItem
			asChild={true}
			className='justify-between text-rose-400'
		>
			<Link href={'/api/auth/sign-out'}>
				<span className='truncate'>Log Out</span>
				<SignOutIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
			</Link>
		</DropdownMenuItem>
	);
}
