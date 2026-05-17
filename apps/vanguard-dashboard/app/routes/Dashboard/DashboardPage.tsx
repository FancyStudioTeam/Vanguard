import type { ReactNode } from 'react';
import { match, P } from 'ts-pattern';

import { getUser } from '#server/utils/API/getUser.ts';
import { getUserGuilds } from '#server/utils/API/getUserGuilds.ts';
import type { Route } from './+types/DashboardPage';
import { GuildSelector } from './components/GuildSelector/GuildSelector.tsx';
import { GuildSelectorEmptyState } from './components/GuildSelector/GuildSelectorEmptyState.tsx';

export async function loader({ request }: Route.LoaderArgs) {
	return {
		guilds: await getUserGuilds(request),
		user: await getUser(request),
	};
}

export default function ({ loaderData }: Route.ComponentProps) {
	const { guilds } = loaderData;

	return match(guilds)
		.returnType<ReactNode>()
		.with(
			P.when(({ length }) => !length),
			() => <GuildSelectorEmptyState />,
		)
		.otherwise((guilds) => <GuildSelector guilds={guilds} />);
}
