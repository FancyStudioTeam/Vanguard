import type { APIUserGuild } from '@vanguard/api-types/interfaces';

import { GuildSelectorCard } from './Card/GuildSelectorCard.tsx';

export function GuildSelector({ guilds }: GuildSelectorProps) {
	return guilds.map(({ id, ...guild }) => (
		<GuildSelectorCard
			id={id}
			key={id}
			{...guild}
		/>
	));
}

export interface GuildSelectorProps {
	guilds: APIUserGuild[];
}
