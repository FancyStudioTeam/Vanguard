import type { APIUserGuild } from '@vanguard/api-types/interfaces';

import { GuildSelectorCard } from './Card/GuildSelectorCard.tsx';

export function GuildSelector({ guilds }: GuildSelectorProps) {
	return (
		<section className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
			{guilds.map(({ id, ...guild }) => (
				<GuildSelectorCard
					id={id}
					key={id}
					{...guild}
				/>
			))}
		</section>
	);
}

export interface GuildSelectorProps {
	guilds: APIUserGuild[];
}
