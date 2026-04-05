import Link from 'next/link';
import type { UserGuild } from '#types/Discord.ts';
import { GuildCardFooter } from './GuildCardFooter.tsx';
import { GuildCardHeader } from './GuildCardHeader.tsx';

export function GuildCard({ id, ...props }: GuildProps) {
	return (
		<Link
			className='flex flex-col divide-y-2 divide-neutral-800 overflow-hidden rounded-xl border-2 border-neutral-800 bg-neutral-900 transition-colors hover:bg-neutral-800/75'
			href={`/dashboard/${id}`}
		>
			<GuildCardHeader
				id={id}
				{...props}
			/>
			<GuildCardFooter
				id={id}
				{...props}
			/>
		</Link>
	);
}

export type GuildProps = UserGuild;
