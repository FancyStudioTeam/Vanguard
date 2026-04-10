import type { SessionGuild } from '#types/Auth.ts';
import { Guild } from '../guild/Guild.tsx';

export function GuildSelector({ guilds }: GuildSelectorProps) {
	return (
		<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
			{guilds.map(({ id, ...guild }) => (
				<Guild
					id={id}
					key={id}
					{...guild}
				/>
			))}
		</div>
	);
}

export interface GuildSelectorProps {
	guilds: SessionGuild[];
}
