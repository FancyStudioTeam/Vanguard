import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import { GuildSelector } from '#components/Dashboard/GuildSelector/GuildSelector.tsx';
import { GuildSelectorFallback } from '#components/Dashboard/GuildSelector/GuildSelectorFallback.tsx';
import { getUser } from '#server/utils/API/getUser.ts';
import { getUserGuilds } from '#server/utils/API/getUserGuilds.ts';
import type { Route } from './+types/dashboard';

export async function loader({ request }: Route.LoaderArgs) {
	await getUser(request);

	return {
		guilds: getUserGuilds(request),
	};
}

export default function () {
	// biome-ignore lint/correctness/useHookAtTopLevel: (x)
	const { guilds } = useLoaderData<typeof loader>();

	return (
		<Suspense fallback={<GuildSelectorFallback />}>
			<Await resolve={guilds}>
				{(guilds) => (
					<section className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
						<GuildSelector guilds={guilds} />
					</section>
				)}
			</Await>
		</Suspense>
	);
}
