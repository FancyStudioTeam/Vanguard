import type { ReactNode } from 'react';
import type { MetaDescriptor } from 'react-router';
import { match, P } from 'ts-pattern';

import { PageLayout } from '#layouts/PageLayout.tsx';
import { getUser } from '#server/utils/API/getUser.ts';
import { getUserGuilds } from '#server/utils/API/getUserGuilds.ts';
import type { Route } from './+types/DashboardPage';
import { GuildSelector } from './components/GuildSelector/GuildSelector.tsx';
import { GuildSelectorEmptyState } from './components/GuildSelector/GuildSelectorEmptyState.tsx';

export function meta(): MetaDescriptor[] {
	return [
		{
			title: 'Vanguard',
		},
		{
			robots: 'noindex, nofollow',
		},
	];
}

export async function loader({ request }: Route.LoaderArgs) {
	return {
		guilds: await getUserGuilds(request),
		user: await getUser(request),
	};
}

export default function ({ loaderData }: Route.ComponentProps) {
	const { guilds } = loaderData;

	return (
		<PageLayout>
			<main className='mx-auto mt-15 w-full max-w-7xl p-8'>
				{match(guilds)
					.returnType<ReactNode>()
					.with(
						P.when(({ length }) => !length),
						() => <GuildSelectorEmptyState />,
					)
					.otherwise((guilds) => (
						<GuildSelector guilds={guilds} />
					))}
			</main>
		</PageLayout>
	);
}
