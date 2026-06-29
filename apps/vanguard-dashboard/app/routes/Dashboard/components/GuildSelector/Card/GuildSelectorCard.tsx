import type { APIUserGuild } from '@vanguard/api-contracts/interfaces';

import { GuildSelectorCardFooter } from './GuildSelectorCardFooter.tsx';
import { GuildSelectorCardHeader } from './GuildSelectorCardHeader.tsx';

export function GuildSelectorCard(props: GuildSelectorCardProps) {
	return (
		<section className='flex flex-col gap-4'>
			<GuildSelectorCardHeader {...props} />
			<GuildSelectorCardFooter {...props} />
		</section>
	);
}

export type GuildSelectorCardProps = APIUserGuild;
