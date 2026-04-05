import {
	DiscordLogoIcon,
	GithubLogoIcon,
	GridFourIcon,
} from '@phosphor-icons/react';
import { DropdownMenuGroup } from '#/components/ui/Dropdown.tsx';
import {
	type NavbarProfileDropdownLinkProps as DropdownLink,
	NavbarProfileDropdownLink,
} from './NavbarProfileDropdownLink.tsx';

const DROPDOWN_LINKS: DropdownLink[] = [
	{
		href: '/dashboard',
		icon: GridFourIcon,
		text: 'Manage Servers',
	},
	{
		href: '/discord',
		icon: DiscordLogoIcon,
		target: '_blank',
		text: 'Join our Discord',
	},
	{
		href: '/github',
		icon: GithubLogoIcon,
		target: '_blank',
		text: 'View the Repository',
	},
];

export function NavbarProfileDropdownLinks() {
	return (
		<DropdownMenuGroup>
			{DROPDOWN_LINKS.map(({ text, ...link }) => (
				<NavbarProfileDropdownLink
					key={text}
					text={text}
					{...link}
				/>
			))}
		</DropdownMenuGroup>
	);
}
