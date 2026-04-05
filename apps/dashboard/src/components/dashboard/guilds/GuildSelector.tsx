import { getCurrentUserGuilds } from '#utils/Discord/getCurrentUserGuilds.ts';
import { GuildCard } from './GuildCard.tsx';

export async function GuildSelector({ accessToken }: GuildSelectorProps) {
	const userGuilds = await getCurrentUserGuilds(accessToken);

	return (
		<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
			{userGuilds.map(({ id, ...guild }) => (
				<GuildCard
					id={id}
					key={id}
					{...guild}
				/>
			))}
		</div>
	);
}

export interface GuildSelectorProps {
	accessToken: string;
}
