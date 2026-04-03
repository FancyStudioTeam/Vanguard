import { UserIcon } from '@phosphor-icons/react';
import { Button } from '#/components/ui/Button.tsx';
import { DropdownMenuTrigger } from '#/components/ui/Dropdown.tsx';
import type { User } from '#/lib/types/User.ts';

export function NavbarProfileDropdownButton({ user }: NavbarProfileDropdownButtonProps) {
	const { name } = user;

	return (
		<Button asChild={true} variant='secondary'>
			<DropdownMenuTrigger>
				<UserIcon className='size-5 shrink-0' weight='duotone' />
				<span className='truncate'>{name}</span>
			</DropdownMenuTrigger>
		</Button>
	);
}

export interface NavbarProfileDropdownButtonProps {
	user: User;
}
