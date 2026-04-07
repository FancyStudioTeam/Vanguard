import { UserIcon } from '@phosphor-icons/react';
import { Button } from '#components/ui/Button.tsx';
import { DropdownMenuTrigger } from '#components/ui/Dropdown.tsx';
import type { AuthUser } from '#types/Auth.ts';

export function NavbarProfileDropdownButton({
	user,
}: NavbarProfileDropdownButtonProps) {
	const { name } = user;

	return (
		<Button
			asChild={true}
			className='w-full max-w-40'
			variant='secondary'
		>
			<DropdownMenuTrigger>
				<UserIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
				<span className='truncate'>{name}</span>
			</DropdownMenuTrigger>
		</Button>
	);
}

export interface NavbarProfileDropdownButtonProps {
	user: AuthUser;
}
