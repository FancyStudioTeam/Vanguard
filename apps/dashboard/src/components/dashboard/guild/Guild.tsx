import Link from 'next/link';
import type { UserGuild } from '#types/Discord.ts';
import { GuildFooter } from './footer/GuildFooter.tsx';
import { GuildHeader } from './header/GuildHeader.tsx';

export function Guild(props: GuildProps) {
	const { id } = props;

	return (
		<Link
			className='flex flex-col divide-y-2 divide-neutral-800 overflow-hidden rounded-xl border-2 border-neutral-800 bg-neutral-900 transition-colors hover:bg-neutral-800/75'
			href={`/dashboard/${id}`}
		>
			<GuildHeader {...props} />
			<GuildFooter {...props} />
		</Link>
	);
}

export type GuildProps = UserGuild;
