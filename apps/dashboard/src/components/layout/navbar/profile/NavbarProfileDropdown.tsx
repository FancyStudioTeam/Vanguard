import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
} from '#components/ui/Dropdown.tsx';
import type { SessionUser } from '#types/Auth.ts';
import { NavbarProfileDropdownButton } from './NavbarProfileDropdownButton.tsx';
import { NavbarProfileDropdownLinks } from './NavbarProfileDropdownLinks.tsx';
import { NavbarProfileDropdownLogout } from './NavbarProfileDropdownLogout.tsx';
import { NavbarProfileDropdownUser } from './NavbarProfileDropdownUser.tsx';

export function NavbarProfileDropdown({ user }: NavbarProfileDropdownProps) {
	return (
		<DropdownMenu>
			<NavbarProfileDropdownButton user={user} />
			<DropdownMenuContent className='w-60'>
				<NavbarProfileDropdownUser user={user} />
				<DropdownMenuSeparator />
				<NavbarProfileDropdownLinks />
				<DropdownMenuSeparator />
				<NavbarProfileDropdownLogout />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export interface NavbarProfileDropdownProps {
	user: SessionUser;
}
