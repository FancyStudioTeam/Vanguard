import { Outlet } from 'react-router';

import { Sidebar } from '#components/Layout/Sidebar/Sidebar.tsx';
import { guildContext } from '#context/GuildContext.ts';
import { userContext } from '#context/UserContext.ts';
import { getGuild } from '#server/utils/API/getGuild.ts';
import { getUser } from '#server/utils/API/getUser.ts';
import type { Route } from './+types/layout';

const authMiddleware: Route.MiddlewareFunction = async ({ context, params, request }) => {
	const { guildId } = params;

	const user = await getUser(request);
	const guild = await getGuild(request, guildId);

	context.set(userContext, user);
	context.set(guildContext, guild);
};

export const middleware: Route.MiddlewareFunction[] = [
	authMiddleware,
];

export function loader({ context }: Route.LoaderArgs) {
	const guild = context.get(guildContext);
	const user = context.get(userContext);

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
