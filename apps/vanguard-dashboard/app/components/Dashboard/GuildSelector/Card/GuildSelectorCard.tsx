import type { APIUserGuild } from '@vanguard/api-types/interfaces';

import { GuildSelectorCardFooter } from './GuildSelectorCardFooter.tsx';
import { GuildSelectorCardHeader } from './GuildSelectorCardHeader.tsx';

export function GuildSelectorCard(props: GuildSelectorCardProps) {
	const { id } = props;

	return (
		<a
			className='flex flex-col divide-y-2 divide-neutral-800 overflow-hidden rounded-xl border-2 border-neutral-800 bg-neutral-900 transition-colors hover:bg-neutral-800/75'
			href={`/dashboard/${id}`}
		>
			<GuildSelectorCardHeader {...props} />
			<GuildSelectorCardFooter {...props} />
		</a>
	);
}

export type GuildSelectorCardProps = APIUserGuild;
