import { GuildSelector } from '#components/Dashboard/GuildSelector/GuildSelector.tsx';
import { getUser } from '#server/utils/API/getUser.ts';
import { getUserGuilds } from '#server/utils/API/getUserGuilds.ts';
import type { Route } from './+types/dashboard';

export async function loader({ request }: Route.LoaderArgs) {
	return {
		guilds: await getUserGuilds(request),
		user: await getUser(request),
	};
}

export default function ({ loaderData }: Route.ComponentProps) {
	const { guilds } = loaderData;

	return (
		<section className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
			<GuildSelector guilds={guilds} />
		</section>
	);
}
