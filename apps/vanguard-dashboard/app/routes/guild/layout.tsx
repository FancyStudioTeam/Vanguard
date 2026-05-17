import { Outlet } from 'react-router';

import { Sidebar } from '#components/Layout/Sidebar/Sidebar.tsx';
import { GuildContext } from '#context/GuildContext.ts';
import { UserContext } from '#context/UserContext.ts';
import { getGuild } from '#server/utils/API/getGuild.ts';
import { getUser } from '#server/utils/API/getUser.ts';
import type { Route } from './+types/layout';

const authMiddleware: Route.MiddlewareFunction = async ({ context, params, request }) => {
	const { guildId } = params;

	const guild = await getGuild(request, guildId);
	const user = await getUser(request);

	context.set(GuildContext, guild);
	context.set(UserContext, user);
};

export const middleware: Route.MiddlewareFunction[] = [
	authMiddleware,
];

export function loader({ context }: Route.LoaderArgs) {
	const guild = context.get(GuildContext);
	const user = context.get(UserContext);

	return {
		guild,
		user,
	};
}

export default function ({ loaderData }: Route.ComponentProps) {
	const { guild } = loaderData;

	return (
		<div className='flex flex-row gap-6'>
			<Sidebar guild={guild} />
			<main className='flex w-full flex-col gap-6'>
				<Outlet />
			</main>
		</div>
	);
}
