import { Link } from 'react-router';

import type { UserGuild } from '#server/lib/Types/API.ts';
import { GuildSelectorCardFooter } from './GuildSelectorCardFooter.tsx';
import { GuildSelectorCardHeader } from './GuildSelectorCardHeader.tsx';

export function GuildSelectorCard(props: GuildSelectorCardProps) {
	const { id } = props;

	return (
		<Link
			className='flex flex-col divide-y-2 divide-neutral-800 overflow-hidden rounded-xl border-2 border-neutral-800 bg-neutral-900 transition-colors hover:bg-neutral-800/75'
			to={`/dashboard/${id}`}
		>
			<GuildSelectorCardHeader {...props} />
			<GuildSelectorCardFooter {...props} />
		</Link>
	);
}

export type GuildSelectorCardProps = UserGuild;
