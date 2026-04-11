import type { UserGuild } from '#server/lib/Types/API.ts';
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
	guilds: UserGuild[];
}
