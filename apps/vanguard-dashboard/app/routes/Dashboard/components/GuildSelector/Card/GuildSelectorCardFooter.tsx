import type { DiscordUserGuild } from '@vanguard/api-contracts/interfaces';

import { IDcardFill } from '@mingcute/react';
import { Link } from 'react-router';

import { ButtonVariants } from '#components/UI/Button.tsx';

export function GuildSelectorCardFooter({ id, name }: GuildSelectorCardFooterProps) {
	return (
		<footer className='flex items-center gap-4'>
			<ul className='min-w-0 flex-1'>
				<li className='truncate font-bold'>{name}</li>
				<li className='flex items-center gap-2 text-neutral-400 text-sm'>
					<IDcardFill className='size-5 shrink-0' />
					<span className='truncate'>{id}</span>
				</li>
			</ul>
			<Link
				className={ButtonVariants()}
				to={`/dashboard/${id}`}
			>
				Manage Guild
			</Link>
		</footer>
	);
}

export type GuildSelectorCardFooterProps = Pick<DiscordUserGuild, 'id' | 'name'>;
