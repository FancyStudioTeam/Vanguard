import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/Avatar.tsx';
import type { User } from '#/lib/types/User.ts';

export function NavbarProfileDropdownUser({ user }: NavbarProfileDropdownUserProps) {
	const { avatar, id, name } = user;

	const userAvatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}`;
	const userUrl = `https://discord.com/users/${id}`;

	return (
		<Link
			className='flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-neutral-800/75'
			href={userUrl}
			target='_blank'
		>
			<Avatar>
				<AvatarImage src={userAvatarUrl} />
				<AvatarFallback>{name}</AvatarFallback>
			</Avatar>
			<ul>
				<li className='truncate font-bold'>@{name}</li>
				<li className='text-neutral-400 text-xs'>{id}</li>
			</ul>
		</Link>
	);
}

export interface NavbarProfileDropdownUserProps {
	user: User;
}
